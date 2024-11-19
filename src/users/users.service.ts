import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import * as bcrypt from 'bcryptjs'
import { GithubUserEntity } from './schemas/githubUser.entity';
import axios from 'axios';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id:string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if(!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByEmail(email : string) : Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findByUserName(userName : string) : Promise<UserDocument | null> {
        return this.userModel.findOne({ userName }).exec();
    }

    async register(userDTO: CreateUserDTO) : Promise<User> {

        const hashedPassword = await this.hashPassword(userDTO.password);
        let userGithub;
        if(userDTO.github_username) {
            userGithub = await this.getGithubUser(userDTO.github_username);
        }
        
        const newUser = new this.userModel({
            ...userDTO,
            password : hashedPassword,
        });

        if(userGithub){
            newUser['github_user'] = userGithub;
        }
        return newUser.save();
    }


    async update(id: string, userDTO: UpdateUserDTO): Promise<User>  {
        return this.userModel.findByIdAndUpdate(id, userDTO, {new : true}).exec();
    }

    async delete(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id).exec();
    }



    private async getGithubUser(github_user: string) : Promise<GithubUserEntity>|null {
        const githubUser = new GithubUserEntity();
        const url = `https://api.github.com/users/${github_user}`;
        const response = await axios.get(url);

        if(response.status !== 200) {
            return null;
        }

        
        githubUser.github_user = response.data.login;
        githubUser.github_url = response.data.html_url;
        githubUser.location = response.data.location;
        githubUser.avatar_url = response.data.avatar_url;
        githubUser.location = response.data.location;
        githubUser.email = response.data.email;
        githubUser.name = response.data.name;
        return githubUser;
    }

    private async hashPassword(password : string) : Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
}
