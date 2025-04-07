import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('SurveysForUsersController (e2e)', () => {
  let app: NestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/surveys (GET)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'user1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .get('/surveys')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect((response) => {
        return (
          response.body[0].title === 'surveys1' && response.body[0].owner_id === 1
          && response.body[1].title === 'surveys2' && response.body[1].owner_id === 2
        );
      });
  }),
  it('/surveys/all-info (GET)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'user1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .get('/surveys/all-info')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect(
        (response) => {
            return (
              response.body[1]['title'] === 'survey1'
              && response.body[1]['questions'][1]['question'] === 'question1'
              && response.body[1]['questions'][1]['type'] === 'single choice'
              && response.body[1]['questions'][1]['options'][1]['title'] === 'option1'
            );
          }
      );
  }),
  it('/surveys/1/questions (GET)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'user1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .get('/surveys/1/questions')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect((response) => {
        return (
          response.body[0].survey_id === 1 && response.body[0].question === 'question1'
          && response.body[0].type === 'single choiсe'
          && response.body[1].survey_id === 1 && response.body[1].questions === 'question2'
          && response.body[1].type === 'multiple choiсe'
        );
      });
  }),
  it('/surveys/questions/1/options (GET)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'user1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .get('/surveys/questions/1/options')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect((response) => {
        return (
          response.body[0].question_id === 1 && response.body[0].title === 'option1'
        );
      });
  })
    
  afterAll(async () => {
    await app.close();
  });
});
