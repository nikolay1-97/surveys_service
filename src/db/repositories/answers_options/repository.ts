import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { AnswersOptions } from 'src/db/models/answersOptions/answersOptions'; 

@Injectable()
export class AnswersOptionsRepository {
  constructor(
    @Inject('AnswersOptions') private modelClass: ModelClass<AnswersOptions>,
  ) {}

  async create(answer_id: number, option_id: number) {
    try {
      const data: object = {
        answer_id: answer_id,
        option_id: option_id,
      };
      await this.modelClass.query().insert(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getBySurveyAnswerIdAndOptionId(answer_id: number, option_id: number) {
        try {
          const answerOption: AnswersOptions[] | undefined = await this.modelClass
            .query()
            .select('*')
            .where('answer_id', '=', answer_id)
            .where('option_id', '=', option_id);
    
          return answerOption[0];
        } catch (e) {
          console.log(e);
          throw e;
        }
    }

}
