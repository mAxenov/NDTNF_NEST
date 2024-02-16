import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './interfaces/dto/createBookDto';
import { BookDocument } from './schemas/books.schema';
import { IParamId } from './interfaces/param-id';
import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';
//import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';

@Controller('books')
@UseInterceptors(ResponseInterceptor)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll(): Promise<BookDocument[]> {
    if (Math.random() > 0.75) {
      throw new Error('Не повезло');
    }
    return this.booksService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateBookDto): Promise<BookDocument> {
    return this.booksService.create(body);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
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
