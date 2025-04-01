import { Module, Global } from '@nestjs/common';
import { Admins } from './models/admins/admins';
import { Users } from './models/users/users';
import { Surveys } from './models/surveys/surveys';
import { SurveyResults } from './models/survey_results/survey_results';
import { Questions } from './models/questions/questions';
import { Answers } from './models/answers/answers';
import { Options } from './models/options/options';
import { AnswersOptions } from './models/answersOptions/answersOptions';
import { knexSnakeCaseMappers } from 'objection';
import { Model } from 'objection';
import { knex } from 'knex';
import config from '../configuration/index';

const models = [
    Admins,
    Users,
    Surveys,
    SurveyResults,
    Questions,
    Answers,
    Options,
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
