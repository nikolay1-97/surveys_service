import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { Option } from 'src/db/models/options/options';


@Injectable()
export class OptionsRepository {
  constructor(@Inject('Option') private modelClass: ModelClass<Option>) {}

  async getById(id: number) {
    try {
      const item: Option | undefined = await this.modelClass.query().findById(id);

      return item;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByQuestionId(question_id: number) {
    try {
      const items: Option[] | undefined = await this.modelClass
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
        const items: Option[] | undefined = await this.modelClass
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
      const items: Option[] | undefined = await this.modelClass
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

  async create(data: object) {
    try {
      return await this.modelClass.query().insert(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async changeTitle(id: number, data: object) {
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

  async getByAnswerIdAndOptionId(
      answer_id,
      option_id: number,
    ) {
      try {
        const items: Option[] | undefined = await this.modelClass
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

}
