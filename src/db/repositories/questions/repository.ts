import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { Question } from 'src/db/models/questions/questions';
import { CreateQuestionDto } from 'src/api/dto/questions/questionCreateResponse.dto';
import { ChangeQuestionQuestionDto } from 'src/api/dto/questions/questionChangeQuestion.dto';
import { ChangeTypeQuestionDto } from 'src/api/dto/questions/questionChangeType.dto';

@Injectable()
export class QuestionsRepository {
  constructor(@Inject('Question') private modelClass: ModelClass<Question>) {}

  async getById(id: number) {
    try {
      const question: Question | undefined = await this.modelClass.query().findById(id);

      return question;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getBySurveyId(survey_id: number) {
    try {
      const question: Question[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('survey_id', '=', survey_id);

      return question;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }


  async getBySurveyIdAndQuestion(survey_id: number, question: string) {
    try {
      const questions: Question[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('survey_id', '=', survey_id)
        .where('question', '=', question);

      return questions[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(survey_id: number, dto: CreateQuestionDto) {
    try {
      const data = {
        survey_id: survey_id,
        question: dto.question,
        type: dto.type,
      }
      await this.modelClass.query().insert(data);
      return dto;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async changeQuestion(id: number, dto: ChangeQuestionQuestionDto) {
    try {
      await this.modelClass
        .query()
        .patch(dto)
        .where({ id })
        .returning('*')
        .first();
      return dto;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async changeType(id: number, dto: ChangeTypeQuestionDto) {
    try {
      await this.modelClass
        .query()
        .patch(dto)
        .where({ id })
        .returning('*')
        .first();
      return dto;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(id: number) {
    try {
      await this.modelClass.query().deleteById(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
