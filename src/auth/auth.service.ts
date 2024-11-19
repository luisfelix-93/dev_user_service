import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcryptjs';
import { Session, SessionDocument } from "./schemas/session.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

export interface UserPayload {
    userName: string;
    sessionId: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        @InjectModel(Session.name) private readonly sessionModel: Model<SessionDocument>,
    ) {}

    async login(userName: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userService.findByUserName(userName);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const newSession = new this.sessionModel({
            userId: user._id,
            userName,
            dateSession: new Date(),
            expiresIn: Date.now() + 3600 * 1000
        });

        await newSession.save();

        const payload: UserPayload = {
            userName: user.userName,
            sessionId: newSession._id.toString(),
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async getSessionByUserId(userId: string): Promise<SessionDocument> {
        return await this.sessionModel.findOne({userId});
    }
}