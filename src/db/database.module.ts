import { Module, Global } from '@nestjs/common';
import { Admin } from './models/admins/admins';
import { User } from './models/users/users';
import { Survey } from './models/surveys/surveys';
import { SurveyResult } from './models/survey_results/survey_results';
import { Question } from './models/questions/questions';
import { Answer } from './models/answers/answers';
import { Option } from './models/options/options';
import { AnswersOptions } from './models/answersOptions/answersOptions';
import { knexSnakeCaseMappers } from 'objection';
import { Model } from 'objection';
import { knex } from 'knex';
import config from '../configuration/index';

const models = [
    Admin,
    User,
    Survey,
    SurveyResult,
    Question,
    Answer,
    Option,
    AnswersOptions,
];
const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: () => {
      const db = knex({
        client: 'pg',
        connection: config().db_url,
        ...knexSnakeCaseMappers,
      });
      Model.knex(db);
      return db;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
