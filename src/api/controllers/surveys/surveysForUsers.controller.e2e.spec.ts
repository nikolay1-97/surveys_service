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
        {
            "1": {
              "title": "survey1",
              "questions": {
                "1": {
                  "question": "question1",
                  "options": {
                    "1": {
                      "title": "option1"
                    }
                  }
                },
                "2": {
                  "question": "question2",
                  "options": {
                    "2": {
                      "title": "option1"
                    },
                    "3": {
                      "title": "option2"
                    }
                  }
                },
                "3": {
                  "question": "question3",
                  "options": {
                    "4": {
                      "title": "option1"
                    }
                  }
                }
              }
            },
            "2": {
              "title": "survey2",
              "questions": {
                "4": {
                  "question": "question1",
                  "options": {
                    "5": {
                      "title": "option1"
                    }
                  }
                },
                "5": {
                  "question": "question2",
                  "options": {
                    "6": {
                      "title": "option1"
                    },
                    "7": {
                      "title": "option2"
                    }
                  }
                },
                "6": {
                  "question": "question3",
                  "options": {
                    "8": {
                      "title": "option1"
                    }
                  }
                }
              }
            },
            "3": {
              "title": "survey3",
              "questions": {
                "7": {
                  "question": "question1",
                  "options": {
                    "9": {
                      "title": "option1"
                    }
                  }
                },
                "8": {
                  "question": "question2",
                  "options": {
                    "10": {
                      "title": "option1"
                    },
                    "11": {
                      "title": "option2"
                    }
                  }
                },
                "9": {
                  "question": "question3",
                  "options": {
                    "12": {
                      "title": "option1"
                    }
                  }
                }
              }
            },
            "4": {
              "title": "survey4",
              "questions": {
                "10": {
                  "question": "question1",
                  "options": {
                    "13": {
                      "title": "option1"
                    }
                  }
                },
                "11": {
                  "question": "question2",
                  "options": {
                    "14": {
                      "title": "option1"
                    },
                    "15": {
                      "title": "option2"
                    }
                  }
                },
                "12": {
                  "question": "question3",
                  "options": {
                    "16": {
                      "title": "option1"
                    }
                  }
                }
              }
            }
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
