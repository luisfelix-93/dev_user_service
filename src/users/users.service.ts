import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import * as bcrypt from 'bcryptjs'
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOnde(id:string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if(!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByEmail(email : string) : Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findByUserName(userName : string) : Promise<User | null> {
        return this.userModel.findOne({ userName }).exec();
    }

    async register(userDTO: CreateUserDTO) : Promise<User> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userDTO.password, salt);
        const newUser = new this.userModel({
            ...userDTO,
            password : hashedPassword
        });
        return newUser.save();
    }

    async update(id: string, userDTO: UpdateUserDTO): Promise<User>  {
        return this.userModel.findByIdAndUpdate(id, userDTO, {new : true}).exec();
    }

    async delete(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
