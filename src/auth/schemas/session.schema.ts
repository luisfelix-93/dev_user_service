import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SessionDocument = Session & Document;

@Schema()
export class Session {
    @Prop({ type: String, required: true, ref: 'User' })
    userId;
    @Prop({ type: String, required: true, ref: 'User' })
    userName;
    @Prop({type: Date, required: true, default: Date.now()})
    dateSession;
    @Prop({type: String, required: true })
    expiresIn;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
