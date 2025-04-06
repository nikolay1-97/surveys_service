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

  it('/answers (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'user1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/answers')
      .set('Authorization', 'Bearer ' + token)
      .send(
        {
            "survey_results_id": 2,
            "question_id": 4,
            "answer": "",
            "options": [
              5
            ]
        }
      )
      .expect(201)
      .expect(
        {
            "survey_results_id": 2,
            "question_id": 4,
            "answer": "",
            "options": [
              5
            ]
        }
      );
  }),
  it('/answers (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'user1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/answers')
      .set('Authorization', 'Bearer ' + token)
      .send(
        {
            "survey_results_id": 2,
            "question_id": 4,
            "answer": "",
            "options": [
              5
            ]
        }
      )
      .expect(400)
      .expect(
        {
            message: 'answer already exists',
            error: 'Bad Request',
            statusCode: 400,
        }
      );
  }),
  it('/answers (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'user1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/answers')
      .set('Authorization', 'Bearer ' + token)
      .send(
        {
            "survey_results_id": 10,
            "question_id": 4,
            "answer": "",
            "options": [
              5
            ]
        }
      )
      .expect(400)
      .expect(
        {
            message: 'survey_result not found',
            error: 'Bad Request',
            statusCode: 400,
        }
      );
  }),
  it('/answers (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'user1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/answers')
      .set('Authorization', 'Bearer ' + token)
      .send(
        {
            "survey_results_id": 2,
            "question_id": 1,
            "answer": "",
            "options": [
              5
            ]
        }
      )
      .expect(400)
      .expect(
        {
            message: 'question not found',
            error: 'Bad Request',
            statusCode: 400,
        }
      );
  }),
  it('/answers (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'user1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/answers')
      .set('Authorization', 'Bearer ' + token)
      .send(
        {
            "survey_results_id": 2,
            "question_id": 5,
            "answer": "",
            "options": [
              1
            ]
        }
      )
      .expect(400)
      .expect(
        {
            message: 'option not found',
            error: 'Bad Request',
            statusCode: 400,
        }
      );
  })
  
  afterAll(async () => {
    await app.close();
  });
});
