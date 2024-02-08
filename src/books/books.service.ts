import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  getAll(): [string] {
    return ['Books'];
  }
}
