import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcryptjs'

export interface UserPayload {
    userName: string;
}

@Injectable()
export class AuthService {
    constructor (
        private userService : UsersService,
        private jwtService : JwtService
    ) {}

    async login(userName : string, password : string) {
        const user = await this.userService.findByUserName(userName);

        const authUser = await bcrypt.compare(
            password,
            user.password
        );

        if(!authUser) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload : UserPayload = {
            userName: user.userName
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}