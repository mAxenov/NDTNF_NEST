import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Book, BookDocument } from './schemes/books.scheme';
import { CreateBookDto } from './interfaces/dto/createBookDto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}
  getAll(): Promise<BookDocument[]> {
    return this.BookModel.find();
  }

  create(data: CreateBookDto): Promise<BookDocument> {
    const book = new this.BookModel(data);
    return book.save();
  }

  update(id: string, data: CreateBookDto): Promise<BookDocument> {
    return this.BookModel.findByIdAndUpdate(id, data);
  }

  delete(id: string): Promise<BookDocument> {
    return this.BookModel.findByIdAndDelete(id);
  }
}
