import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('AnswersOptionsController (e2e)', () => {
  let app: NestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/answers-options/1 (GET)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .get('/answers-options/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect(
        {
            "user1@mail.ru": {
              "questions": {
                "question1": {
                  "options": [
                    "option1"
                  ],
                  "answer": null,
                  "type": "single choice"
                },
                "question2": {
                  "options": [
                    "option1",
                    "option2"
                  ],
                  "answer": null,
                  "type": "multiple choice"
                },
                "question3": {
                  "options": [
                    "option1"
                  ],
                  "answer": "Это ответ на вопрос типа текст",
                  "type": "text"
                }
              }
            },
            "count": 1
          }
      );
  })
  
  afterAll(async () => {
    await app.close();
  });
});
