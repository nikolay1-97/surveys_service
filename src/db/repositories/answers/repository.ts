import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { Answers } from 'src/db/models/answers/answers';
import { CreateAnswersType } from 'src/db/types/answers/createAnswersType';

@Injectable()
export class AnswersRepository {
  constructor(
    @Inject('Answers') private readonly modelClass: ModelClass<Answers>,
  ) {}

  async getBySurveyResultIdQuestionIdUserId(
    survey_result_id: number,
    question_id: number,
    user_id: number,
  ) {
    try {
      const items: Answers[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('survey_results_id', '=', survey_result_id)
        .where('question_id', '=', question_id)
        .where('user_id', '=', user_id);

      return items[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(data: CreateAnswersType, trx) {
    try {
      return await this.modelClass.query(trx).insert(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
