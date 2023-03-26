/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    login: string;

    @Prop()
    password: string;

    @Prop({ name: '_id' })
    id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const jwtConstants = {
    secret: "m8*T_aG1",
    expiresIn: '1h'
};