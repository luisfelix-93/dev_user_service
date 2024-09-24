import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { GithubUserEntity } from "./githubUser.entity";

export type UserDocument = User &  Document;

@Schema()
export class User {
    @Prop({required: true})
    userName: string;

    @Prop({required: true})
    fullName: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop()
    github_user: GithubUserEntity;
}

export const UserSchema = SchemaFactory.createForClass(User);