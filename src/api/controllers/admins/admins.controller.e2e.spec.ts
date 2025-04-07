import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('AdminsController (e2e)', () => {
  let app: NestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/admins (POST)', async () => {
    return request(app.getHttpServer())
      .post('/admins')
      .send({
        email: 'admin1@mail.ru',
        password: 'qwerty',
      })
      .expect(201);
  }),
    it('/admins (POST)', async () => {
      return request(app.getHttpServer())
        .post('/admins')
        .send({
          email: 'admin10@mail.ru',
          password: 'qwerty',
        })
        .expect(400)
        .expect({
          message: 'неверный логин или пароль',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/admins (POST)', async () => {
      return request(app.getHttpServer())
        .post('/admins')
        .send({
          email: 'admin1@mail.ru',
          password: 'qwertyifeije',
        })
        .expect(400)
        .expect({
          message: 'неверный логин или пароль',
          error: 'Bad Request',
          statusCode: 400,
        });
    });

  afterAll(async () => {
    await app.close();
  });
});
