import { IsString } from "class-validator";
import { IsUserNameUnique } from "../validators/is-userName-unique.validator";
import { IsEmailUnique } from "../validators/is-email-unique.validator";

export class UpdateUserDTO {
    @IsString()
    @IsUserNameUnique({message : 'Username is already used'})
    readonly userName: string;

    @IsString()
    readonly fullName: string;

    @IsString()
    @IsEmailUnique({message: 'Email is already used'})
    readonly email: string;

    @IsString()
    readonly password: string;
}