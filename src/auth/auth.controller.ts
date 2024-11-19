import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    login(@Body() {userName, password}: AuthDTO) {
        return this.authService.login(userName, password);
    }
}
@Controller('session')
export class SessionController {
    constructor(private readonly authService: AuthService) {}

    @Get(':idUser')
    async getSession(@Param('idUser') idUser: string) {
        return await this.authService.getSessionByUserId(idUser);
    }
}
