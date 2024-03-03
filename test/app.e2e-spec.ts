import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';

describe('Book & Auth Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    mongoose.connect(process.env.MONGO_CONNECTION);
    mongoose.connection.dropDatabase();
  });

  afterAll(() => mongoose.disconnect());

  const newUser = {
    email: '123@mail.ru',
    password: '123',
    firstName: 'string',
    lastName: 'string',
  };

  const newBook = {
    title: 'New Book',
    description: 'Book Description',
    author: 'Author',
  };

  let jwtToken: string = '';
  let bookCreated;

  describe('Auth', () => {
    it('(POST) - Register a new user', async () => {
      return request(app.getHttpServer())
        .post('/api/users/signup')
        .send(newUser)
        .expect(201)
        .then((res) => {
          expect(res.body.data.token).toBeDefined();
        });
    });

    it('(POST) - Login user', async () => {
      return request(app.getHttpServer())
        .post('/api/users/signin')
        .send({ email: newUser.email, password: newUser.password })
        .expect(201)
        .then((res) => {
          expect(res.body.data.token).toBeDefined();
          jwtToken = res.body.data.token;
        });
    });
  });

  describe('Book', () => {
    it('(POST) - Create new Book', async () => {
      return request(app.getHttpServer())
        .post('/books')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send(newBook)
        .expect(201)
        .then((res) => {
          expect(res.body.data._id).toBeDefined();
          expect(res.body.data.title).toEqual(newBook.title);
          bookCreated = res.body;
        });
    });

    it('(GET) - Get all Books', async () => {
      return request(app.getHttpServer())
        .get('/books')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
        .then((res) => {
          expect(res.body.data.length).toBe(1);
        });
    });

    it('(PUT) - Update a Book by ID', async () => {
      const book = { title: 'Updated name' };
      console.log(bookCreated);
      return request(app.getHttpServer())
        .put(`/books/${bookCreated?.data._id}`)
        .set('Authorization', 'Bearer ' + jwtToken)
        .send(book)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.data.title).toEqual(book.title);
        });
    });

    it('(DELETE) - Delete a Book by ID', async () => {
      return request(app.getHttpServer())
        .delete(`/books/${bookCreated?.data._id}`)
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.data._id).toEqual(bookCreated?.data._id);
        });
    });
  });
});
