import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { Questions } from 'src/db/models/questions/questions';


@Injectable()
export class QuestionsRepository {
  constructor(@Inject('Questions') private modelClass: ModelClass<Questions>) {}

  async getById(id: number) {
    try {
      const item: Questions | undefined = await this.modelClass.query().findById(id);

      return item;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getBySurveyId(survey_id: number) {
    try {
      const items: Questions[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('survey_id', '=', survey_id);

      return items;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }


  async getBySurveyIdAndQuestion(survey_id: number, question: string) {
    try {
      const items: Questions[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('survey_id', '=', survey_id)
        .where('question', '=', question);

      return items[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(data: object) {
    try {
      return await this.modelClass.query().insert(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async changeQuestion(id: number, data: object) {
    try {
      await this.modelClass
        .query()
        .patch(data)
        .where({ id })
        .returning('*')
        .first();
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async changeType(id: number, data: object) {
    try {
      await this.modelClass
        .query()
        .patch(data)
        .where({ id })
        .returning('*')
        .first();
      return data;
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
