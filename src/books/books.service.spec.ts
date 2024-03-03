import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BooksService } from './books.service';
import { Book } from './schemes/books.scheme';

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Book>;

  const mockBook = {
    _id: '1',
    title: 'New Book',
    description: 'Book Description',
    author: 'Author',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = await module.resolve<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken(Book.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of books', async () => {
      jest.spyOn(model, 'find').mockResolvedValue([mockBook]);

      const result = await service.getAll();

      expect(result).toEqual([mockBook]);
    });
  });

  describe('create', () => {
    it('should create a book', async () => {
      const newBook = {
        title: 'New Book',
        description: 'Book Description',
        author: 'Author',
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockBook as any));

      const result = await service.create(newBook);

      expect(result).toEqual(mockBook);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updatedBook = { ...mockBook, title: 'Updated name' };
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedBook);

      const result = await service.update(mockBook._id, updatedBook);

      expect(result).toEqual(updatedBook);
    });
  });

  describe('delete', () => {
    it('should delete a book', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockBook);

      const result = await service.delete(mockBook._id);

      expect(result).toEqual(mockBook);
    });
  });
});
