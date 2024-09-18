import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersService } from "../users.service";

@Injectable()
@ValidatorConstraint({ async : true})
export class IsUserNameUniqueValidator implements ValidatorConstraintInterface {
    constructor(private readonly userService : UsersService) {}

    async validate(userName : string) : Promise<boolean> {
        const user = await this.userService.findByUserName(userName);

        return !user;
    }
}

export function IsUserNameUnique(validationOptions? : ValidationOptions) {
    return function (object : object, propertyName : string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserNameUniqueValidator
        });
    };
}