import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User {
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  email: string;

  @IsNotEmpty()
  @IsEmail()
  @Prop({ required: true })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
