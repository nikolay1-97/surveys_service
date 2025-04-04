import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { Options } from 'src/db/models/options/options';
import { CreateOptionsType } from 'src/db/types/options/createOptionsType';
import { ChangeTitleOptionsType } from 'src/db/types/options/changeTitleOptionsType';

@Injectable()
export class OptionsRepository {
  constructor(@Inject('Options') private modelClass: ModelClass<Options>) {}

  async getById(id: number) {
    try {
      const item: Options | undefined = await this.modelClass
        .query()
        .findById(id);

      return item;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByQuestionId(question_id: number) {
    try {
      const items: Options[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('question_id', '=', question_id);

      return items;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getBySurveyIdAndQuestionId(survey_id: number, question_id: number) {
    try {
      const items: Options[] | undefined = await this.modelClass
        .query()
        .where('surveys.id', '=', survey_id)
        .where('questions.id', '=', question_id)
        .join('questions', 'questions.id', '=', 'options.question_id')
        .join('surveys', 'surveys.id', '=', 'questions.survey_id')
        .select('options.id', 'options.title');

      return items;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByQuestionIdAndTitle(question_id: number, title: string) {
    try {
      const items: Options[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('question_id', '=', question_id)
        .where('title', '=', title);

      return items[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(data: CreateOptionsType, trx) {
    try {
      return await this.modelClass.query(trx).insert(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(id: number, data: ChangeTitleOptionsType, trx) {
    try {
      await this.modelClass
        .query(trx)
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

  async delete(id: number, trx) {
    try {
      await this.modelClass.query(trx).deleteById(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByAnswerIdAndOptionId(answer_id, option_id: number) {
    try {
      const items: Options[] | undefined = await this.modelClass
        .query()
        .where('answers.id', '=', answer_id)
        .where('options.id', '=', option_id)
        .join('questions', 'questions.id', '=', 'options.question_id')
        .join('answers', 'questions.id', '=', 'answers.question_id')
        .select('options.id', 'options.title');

      return items[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByIdQuestionIdOwnerId(
    id: number,
    question_id: number,
    owner_id: number,
  ) {
    try {
      const items: Options[] | undefined = await this.modelClass
        .query()
        .where('options.id', '=', id)
        .where('questions.id', '=', question_id)
        .where('admins.id', '=', owner_id)
        .join('questions', 'questions.id', '=', 'options.question_id')
        .join('surveys', 'surveys.id', '=', 'questions.survey_id')
        .join('admins', 'admins.id', '=', 'surveys.owner_id')
        .select('options.id');

      return items[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByIdOwnerId(id: number, owner_id: number) {
    try {
      const items: Options[] | undefined = await this.modelClass
        .query()
        .where('options.id', '=', id)
        .where('admins.id', '=', owner_id)
        .join('questions', 'questions.id', '=', 'options.question_id')
        .join('surveys', 'surveys.id', '=', 'questions.survey_id')
        .join('admins', 'admins.id', '=', 'surveys.owner_id')
        .select('options.id');

      return items[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
