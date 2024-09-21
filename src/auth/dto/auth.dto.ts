import { IsNotEmpty, IsString } from "class-validator";

export class AuthDTO {
    @IsString()
    @IsNotEmpty({message: 'User name should not be empty'})
    userName: string;

    @IsNotEmpty({message: 'Password should not be empty'})
    password: string;
}