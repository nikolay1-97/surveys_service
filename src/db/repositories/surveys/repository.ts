import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CreateSurveysDto } from 'src/api/dto/surveys/surveysCreate.dto';
import { UpdateSurveysDto } from 'src/api/dto/surveys/surveysUpdate.dto';
import { Survey } from 'src/db/models/surveys/surveys';

@Injectable()
export class SurveysRepository {
  constructor(
    @Inject('Survey') private modelClass: ModelClass<Survey>,
  ) {}

  async getById(id: number) {
    try {
      const survey: Survey | undefined = await this.modelClass.query().findById(id);

      return survey;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByOwnerId(owner_id: number) {
    try {
      const surveys: Survey[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('owner_id', '=', owner_id);

      return surveys;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(owner_id: number, dto: CreateSurveysDto) {
    try {
      const data: object = {
        owner_id: owner_id,
        title: dto.title,
      };
      await this.modelClass.query().insert(data);
      return dto;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async changeTitle(id: number, dto: UpdateSurveysDto) {
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

  async getByTitleAndOwnerId(
    title: string,
    owner_id: number,
  ) {
    try {
      const surveys: Survey[] | undefined = await this.modelClass
        .query()
        .where('title', '=', title)
        .where('surveys.owner_id', '=', owner_id)
        .join('admins', 'surveys.owner_id', '=', 'admins.id')
        .select('surveys.id', 'surveys.title');

      return surveys[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
