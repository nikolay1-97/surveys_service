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

}
