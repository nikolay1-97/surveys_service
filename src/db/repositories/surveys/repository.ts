import { Injectable, Inject } from '@nestjs/common';
import { ModelClass, PartialModelObject } from 'objection';
import { Surveys } from 'src/db/models/surveys/surveys';
import { CreateSurveysType } from 'src/db/types/surveys/CreateSurveysType';
import { ChangeTitleSurveysType } from 'src/db/types/surveys/ChangeTitleSurveysType';

@Injectable()
export class SurveysRepository {
  constructor(
    @Inject('Surveys') private modelClass: ModelClass<Surveys>,
  ) {}

  async getById(id: number) {
    try {
      const item: Surveys | undefined = await this.modelClass.query().findById(id);

      return item;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getAll() {
    try {
      const items: Surveys[] | undefined = await this.modelClass.query();

      return items;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByOwnerId(owner_id: number) {
    try {
      const items: Surveys[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('owner_id', '=', owner_id);

      return items;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getItemByIdOwnerId(id: number, owner_id: number) {
    try {
      const items: Surveys[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('id', '=', id)
        .where('owner_id', '=', owner_id);

      return items[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByTitle(title: string) {
    try {
      const items: Surveys[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('title', '=', title);

      return items[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(data: CreateSurveysType, trx) {
    try {
      return await this.modelClass.query(trx).insert(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(id: number, data: ChangeTitleSurveysType, trx) {
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

  async getByTitleAndOwnerId(
    title: string,
    owner_id: number,
  ) {
    try {
      const items: Surveys[] | undefined = await this.modelClass
        .query()
        .where('title', '=', title)
        .where('surveys.owner_id', '=', owner_id)
        .join('admins', 'surveys.owner_id', '=', 'admins.id')
        .select('surveys.id', 'surveys.title');

      return items[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getAllInfo() {
    try {
      const items: Surveys[] | undefined = await this.modelClass
        .query()
        .join('questions', 'surveys.id', '=', 'questions.survey_id')
        .join('options', 'questions.id', '=', 'options.question_id')
        .select(
          'surveys.id as survey_id',
          'surveys.title as survey',
          'questions.id as question_id',
          'question',
          'options.id as option_id',
          'options.title as option',
        );

      if (items.length === 0) {
        return [];
      };


      const res = {}

      for (let cnt = 0; cnt <= items.length-1; cnt++) {
        let survey_id = items[cnt]['survey_id']
        let survey = items[cnt]['survey']
        let question_id = items[cnt]['question_id']
        let question = items[cnt]['question']
        let option_id = items[cnt]['option_id']
        let option = items[cnt]['option']

        if (survey_id in res) {
          if (question_id in res[survey_id]['questions']) {
            res[survey_id]['questions'][question_id]['options'][option_id] = {title: option}
          }
          else {
            res[survey_id]['questions'][question_id] = {}
            res[survey_id]['questions'][question_id]['question'] = question
            res[survey_id]['questions'][question_id]['options'] = {}
            res[survey_id]['questions'][question_id]['options'][option_id] = {title: option}
          }

        }
        else {
          res[survey_id] = {}
          res[survey_id]['title'] = survey
          res[survey_id]['questions'] = {}
          res[survey_id]['questions'][question_id] = {}
          res[survey_id]['questions'][question_id]['question'] = question
          res[survey_id]['questions'][question_id]['options'] = {}
          res[survey_id]['questions'][question_id]['options'][option_id] = {title: option}
        }
      }
      
      return res
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}
