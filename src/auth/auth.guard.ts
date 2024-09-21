import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UserPayload } from "./auth.service";

@Injectable()
export class JwtAuthGuard implements CanActivate{

    constructor( private jwtService : JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.getTokenFromHeader(request);
        if(!token) {
            throw new UnauthorizedException('Error from authorization');
        }

        try{
            const payload : UserPayload = await this.jwtService.verifyAsync(token);
            request.user = payload;
        } catch(error) {
            throw new UnauthorizedException('JWT not valid', error);
        } 
        return true;
    }

    private getTokenFromHeader(request : Request) : string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === "Bearer" ? token : undefined;
    }
}