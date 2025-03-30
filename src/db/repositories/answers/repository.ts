import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { Answer } from 'src/db/models/answers/answers';


@Injectable()
export class AnswersRepository {
  constructor(
    @Inject('Answer') private readonly modelClass: ModelClass<Answer>,
  ) {}

  async getBySurveyResultIdQuestionIdUserId(survey_result_id: number, question_id: number, user_id: number) {
      try {
        const answer: Answer[] | undefined = await this.modelClass
          .query()
          .select('*')
          .where('survey_results_id', '=', survey_result_id)
          .where('question_id', '=', question_id)
          .where('user_id', '=', user_id)
          .join('survey_results', 'survey_results.id', '=', 'answers.survey_results_id')
  
        return answer[0];
      } catch (e) {
        console.log(e);
        throw e;
      }
  }

  async create(data: object, trx) {
    try {
      return  await this.modelClass.query(trx).insert(data);
      
    } catch (e) {
      console.log(e);
      throw e;
    }
  }


}
