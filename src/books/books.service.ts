import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemes/books.scheme';
import { CreateBookDto } from './interfaces/dto/createBookDto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>) {}
  getAll(): Promise<BookDocument[]> {
    return this.BookModel.find();
  }

  create(data: CreateBookDto): Promise<BookDocument> {
    return this.BookModel.create(data);
  }

  async update(id: string, data: CreateBookDto): Promise<BookDocument> {
    const updateBook = await this.BookModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    console.log(updateBook);
    return updateBook;
  }

  delete(id: string): Promise<BookDocument> {
    return this.BookModel.findByIdAndDelete(id);
  }
}
