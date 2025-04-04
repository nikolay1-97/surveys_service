import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { Option } from 'src/db/models/options/options';
import { CreateOptionDto } from 'src/api/dto/options/optionCreate.dto';
import { ChangeTitleOptionDto } from 'src/api/dto/options/optionChangeTitle.dto';


@Injectable()
export class OptionsRepository {
  constructor(@Inject('Option') private modelClass: ModelClass<Option>) {}

  async getById(id: number) {
    try {
      const option: Option | undefined = await this.modelClass.query().findById(id);

      return option;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByQuestionId(question_id: number) {
    try {
      const options: Option[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('question_id', '=', question_id);

      return options;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getBySurveyIdAndQuestionId(survey_id: number, question_id: number) {
    try {
        const options: Option[] | undefined = await this.modelClass
        .query()
        .where('surveys.id', '=', survey_id)
        .where('questions.id', '=', question_id)
        .join('questions', 'questions.id', '=', 'options.question_id')
        .join('surveys', 'surveys.id', '=', 'questions.survey_id')
        .select('options.id', 'options.title');

      return options;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }


  async getByQuestionIdAndTitle(question_id: number, title: string) {
    try {
      const options: Option[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('question_id', '=', question_id)
        .where('title', '=', title);

      return options[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(question_id: number, dto: CreateOptionDto) {
    try {
      const data = {
        question_id: question_id,
        title: dto.title,
      }
      await this.modelClass.query().insert(data);
      return dto;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async changeTitle(id: number, dto: ChangeTitleOptionDto) {
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

  async getByAnswerIdAndOptionId(
      answer_id,
      option_id: number,
    ) {
      try {
        const option: Option[] | undefined = await this.modelClass
          .query()
          .where('answers.id', '=', answer_id)
          .where('options.id', '=', option_id)
          .join('questions', 'questions.id', '=', 'options.question_id')
          .join('answers', 'questions.id', '=', 'answers.question_id')
          .select('options.id', 'options.title');
  
        return option[0];
      } catch (e) {
        console.log(e);
        throw e;
      }
    }

}
