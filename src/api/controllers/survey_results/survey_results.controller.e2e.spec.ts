import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('SurveyResultsController (e2e)', () => {
  let app: NestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/survey-results/3 (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'user1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/survey-results/3')
      .set('Authorization', 'Bearer ' + token)
      .expect(201)
      .expect(
        {survey_id: 3}
      );
  }),
  it('/survey-results/3 (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'user1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/survey-results/3')
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
      .expect({
        message: 'survey_result already exists',
        error: 'Bad Request',
        statusCode: 400
      });
  }),
  it('/survey-results/100 (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'user1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/survey-results/100')
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
      .expect({
        message: 'survey not found',
        error: 'Bad Request',
        statusCode: 400
      });
  })

  afterAll(async () => {
    await app.close();
  });
});
