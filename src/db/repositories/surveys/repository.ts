import { Injectable, Inject } from '@nestjs/common';
import { ModelClass, PartialModelObject } from 'objection';
import { Surveys } from 'src/db/models/surveys/surveys';

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

  async create(data: PartialModelObject<Surveys>) {
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
