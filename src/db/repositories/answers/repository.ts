import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CreateAnswersDto } from 'src/api/dto/answers/answerCreateDto';
import { Answer } from 'src/db/models/answers/answers'; 

@Injectable()
export class AnswersRepository {
  constructor(
    @Inject('Answer') private modelClass: ModelClass<Answer>,
  ) {}

  async getBySurveyResultIdAndQuestionId(survey_result_id: number, question_id: number) {
      try {
        const answer: Answer[] | undefined = await this.modelClass
          .query()
          .select('*')
          .where('survey_results_id', '=', survey_result_id)
          .where('question_id', '=', question_id);
  
        return answer[0];
      } catch (e) {
        console.log(e);
        throw e;
      }
    }

  async create(survey_result_id: number, question_id: number, dto: CreateAnswersDto) {
    try {
      const data: object = {
        survey_results_id: survey_result_id,
        question_id: question_id,
        answer: dto.answer,
      };
      await this.modelClass.query().insert(data);
      return dto;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}
