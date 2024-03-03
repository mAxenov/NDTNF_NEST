import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Prop()
  @IsOptional()
  @IsString()
  description: string;

  @Prop()
  @IsOptional()
  @IsString()
  authors: string;

  @Prop()
  @IsOptional()
  @IsBoolean()
  favorite: string;

  @Prop()
  @IsOptional()
  @IsString()
  fileCover: string;

  @Prop()
  @IsOptional()
  @IsString()
  fileName: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
