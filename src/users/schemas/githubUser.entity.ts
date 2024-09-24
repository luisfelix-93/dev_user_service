import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class GithubUserEntity {
    @Prop()
    email: string;

    @Prop()
    name: string;
    
    @Prop()
    github_user: string

    @Prop()
    github_url: string

    @Prop()
    location: string
    
    @Prop()
    avatar_url: string

    @Prop()
    repos: string
}