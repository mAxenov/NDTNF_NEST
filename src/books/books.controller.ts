import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './interfaces/dto/createBookDto';
import { BookDocument } from './schemes/books.scheme';
import { IParamId } from './interfaces/param-id';
import { JwtAuthGuard } from '..//auth/jwt.auth.guard';
import { ResponseInterceptor } from '../interceptor/ResponseInterceptor';
//import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';

@Controller('books')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll(): Promise<BookDocument[]> {
    return this.booksService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateBookDto): Promise<BookDocument> {
    return this.booksService.create(body);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param() { id }: IParamId,
    @Body() body: CreateBookDto,
  ): Promise<BookDocument> {
    return await this.booksService.update(id, body);
  }

  @Delete(':id')
  delete(@Param() { id }: IParamId): Promise<BookDocument> {
    return this.booksService.delete(id);
  }
}
