import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersService } from "../users.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
    constructor(private readonly userService : UsersService) {}
    
    async validate(email: string) : Promise<boolean> {
        const user = await this.userService.findByEmail(email);
        return !user;
    } 
}

export function IsEmailUnique(validationOptions? : ValidationOptions){
    return function (object : object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUniqueValidator
        });
    };
}