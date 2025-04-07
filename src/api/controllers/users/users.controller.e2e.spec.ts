import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('UsersController (e2e)', () => {
  let app: NestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/users (POST)', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'user2@mail.ru',
        password: 'qwerty'
      })
      .expect(201)
      .expect({email: 'user2@mail.ru'});
  }),
  it('/users (POST)', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'user2@mail.ru',
        password: 'qwerty'
      })
      .expect(400)
      .expect({
        message: 'user already exists',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/users/login (POST)', async () => {
    return request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'user1@mail.ru',
        password: 'qwerty'
      })
      .expect(201);
  }),
  it('/users/login (POST)', async () => {
    return request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'user10@mail.ru',
        password: 'qwerty'
      })
      .expect(400)
      .expect({
        message: 'неверный логин или пароль',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/users/login (POST)', async () => {
    return request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'user1@mail.ru',
        password: 'qwertyifeije'
      })
      .expect(400)
      .expect({
        message: 'неверный логин или пароль',
        error: 'Bad Request',
        statusCode: 400,
      });
  })

  afterAll(async () => {
    await app.close();
  });
});
