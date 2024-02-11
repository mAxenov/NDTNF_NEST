import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './interfaces/dto/createBookDto';
import { BookDocument } from './schemas/books.schema';
import { IParamId } from './interfaces/param-id';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll(): Promise<BookDocument[]> {
    return this.booksService.getAll();
  }

  @Post()
  create(@Body() body: CreateBookDto): Promise<BookDocument> {
    console.log(body);
    return this.booksService.create(body);
  }

  @Put(':id')
  update(
    @Param() { id }: IParamId,
    @Body() body: CreateBookDto,
  ): Promise<BookDocument> {
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  delete(@Param() { id }: IParamId): Promise<BookDocument> {
    return this.booksService.delete(id);
  }
}
