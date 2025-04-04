import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('ManageSurveysController (e2e)', () => {
  let app: NestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/admins/surveys (GET)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .get('/admins/surveys')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect((response) => {
        return (
          response.body[0].title === 'survey1' && response.body[1].title === 'survey3'
          && response.body[2].title === 'survey4'
        );
      });
  }),
  it('/admins/surveys/1/questions (GET)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .get('/admins/surveys/1/questions')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect((response) => {
        return (
          response.body[0].question === 'question1' && response.body[1].question === 'question2'
          && response.body[2].question === 'question3'
        );
      });
  }),
  it('/admins/surveys/questions/1/options (GET)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .get('/admins/surveys/questions/1/options')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect((response) => {
        return (
          response.body[0].title === 'option1'
        );
      });
  }),
  it('/admins/surveys (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/admins/surveys')
      .set('Authorization', 'Bearer ' + token)
      .send({ title: 'survey100' })
      .expect(201)
      .expect({title: 'survey100'});
  }),
  it('/admins/surveys (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/admins/surveys')
      .set('Authorization', 'Bearer ' + token)
      .send({ title: 'survey100' })
      .expect(400)
      .expect({
        message: 'survey already exists',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/4 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/admins/surveys/4')
      .set('Authorization', 'Bearer ' + token)
      .send({ title: 'new_survey4' })
      .expect(200)
      .expect({title: 'new_survey4'});
  }),
  it('/admins/surveys/4 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/admins/surveys/4')
      .set('Authorization', 'Bearer ' + token)
      .send({ title: 'new_survey4' })
      .expect(400)
      .expect({
        message: 'survey already exists',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/2 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/admins/surveys/2')
      .set('Authorization', 'Bearer ' + token)
      .send({ title: 'new_survey4' })
      .expect(400)
      .expect({
        message: 'survey not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/3/questions (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/admins/surveys/3/questions')
      .set('Authorization', 'Bearer ' + token)
      .send({
        survey_id: 3,
        question: 'test_question',
        type: 'single choice',
      })
      .expect(201)
      .expect({
        survey_id: 3,
        question: 'test_question',
        type: 'single choice',
      });
  }),
  it('/admins/surveys/3/questions (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/admins/surveys/3/questions')
      .set('Authorization', 'Bearer ' + token)
      .send({
        survey_id: 3,
        question: 'test_question',
        type: 'single choice',
      })
      .expect(400)
      .expect({
        message: 'question already exists',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/2/questions (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/admins/surveys/2/questions')
      .set('Authorization', 'Bearer ' + token)
      .send({
        survey_id: 2,
        question: 'test_question',
        type: 'single choice',
      })
      .expect(400)
      .expect({
        message: 'survey not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/3/questions/7 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/admins/surveys/3/questions/7')
      .set('Authorization', 'Bearer ' + token)
      .send({
        question: 'new_question7',
      })
      .expect(200)
      .expect({
        question: 'new_question7',
      });
  }),
  it('/admins/surveys/3/questions/7 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/admins/surveys/3/questions/7')
      .set('Authorization', 'Bearer ' + token)
      .send({
        question: 'new_question7',
      })
      .expect(400)
      .expect({
        message: 'question already exists',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/2/questions/7 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/admins/surveys/2/questions/7')
      .set('Authorization', 'Bearer ' + token)
      .send({
        question: 'new_question7',
      })
      .expect(400)
      .expect({
        message: 'survey not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/3/questions/4 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/admins/surveys/3/questions/4')
      .set('Authorization', 'Bearer ' + token)
      .send({
        question: 'new_question4',
      })
      .expect(400)
      .expect({
        message: 'question not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/questions/7 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/admins/surveys/questions/7')
      .set('Authorization', 'Bearer ' + token)
      .send({
        type: 'multiple choice',
      })
      .expect(200)
      .expect({
        type: 'multiple choice',
      });
  }),
  it('/admins/surveys/questions/4 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/admins/surveys/questions/4')
      .set('Authorization', 'Bearer ' + token)
      .send({
        type: 'multiple choice',
      })
      .expect(400)
      .expect({
        message: 'question not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/questions/8/options (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/admins/surveys/questions/8/options')
      .set('Authorization', 'Bearer ' + token)
      .send({
        question_id: 8,
        title: 'option3',
      })
      .expect(201)
      .expect({
        question_id: 8,
        title: 'option3',
      });
  }),
  it('/admins/surveys/questions/8/options (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/admins/surveys/questions/8/options')
      .set('Authorization', 'Bearer ' + token)
      .send({
        question_id: 8,
        title: 'option3',
      })
      .expect(400)
      .expect({
        message: 'option already exists',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/questions/5/options (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/admins/surveys/questions/5/options')
      .set('Authorization', 'Bearer ' + token)
      .send({
        question_id: 8,
        title: 'option3',
      })
      .expect(400)
      .expect({
        message: 'question not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/questions/7/options/9 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/admins/surveys/questions/7/options/9')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'new_option9',
      })
      .expect(200)
      .expect({
        title: 'new_option9',
      });
  }),
  it('/admins/surveys/questions/7/options/9 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/admins/surveys/questions/7/options/9')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'new_option9',
      })
      .expect(400)
      .expect({
        message: 'option already exists',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/questions/4/options/5 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/admins/surveys/questions/4/options/5')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'new_option9',
      })
      .expect(400)
      .expect({
        message: 'option not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/questions/7/options/5 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/admins/surveys/questions/7/options/5')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'new_option9',
      })
      .expect(400)
      .expect({
        message: 'option not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/options/9 (DELETE)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .delete('/admins/surveys/options/9')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect((response) => {
        return (
          response.body.id === 9 && response.body.question_id === 7
          && response.body.title === 'option1'
        );
      });
  }),
  it('/admins/surveys/options/9 (DELETE)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .delete('/admins/surveys/options/9')
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
      .expect({
        message: 'option not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/options/9 (DELETE)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .delete('/admins/surveys/options/5')
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
      .expect({
        message: 'option not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/questions/7 (DELETE)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .delete('/admins/surveys/questions/7')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect((response) => {
        return (
          response.body.id === 7 && response.body.survey_id === 3
          && response.body.questions === 'question1'
          && response.body.type === 'single choice'
        );
      });
  }),
  it('/admins/surveys/questions/7 (DELETE)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .delete('/admins/surveys/questions/7')
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
      .expect({
        message: 'question not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/questions/7 (DELETE)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .delete('/admins/surveys/questions/4')
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
      .expect({
        message: 'question not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/4 (DELETE)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .delete('/admins/surveys/4')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect((response) => {
        return (
          response.body.id === 4 && response.body.owner_id === 1
          && response.body.title === 'survey4'
        );
      });
  }),
  it('/admins/surveys/4 (DELETE)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .delete('/admins/surveys/4')
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
      .expect({
        message: 'survey not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
  it('/admins/surveys/2 (DELETE)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/admins')
      .send({ email: 'admin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .delete('/admins/surveys/2')
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
      .expect({
        message: 'survey not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  })
  


  afterAll(async () => {
    await app.close();
  });
});
