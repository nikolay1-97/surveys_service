import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CreateSurveyResultsDto } from 'src/api/dto/survey_results/sur_resCreate.dto';
import { UpdateSurveyResultsDto } from 'src/api/dto/survey_results/sur_resUpdate.dto';
import { SurveyResult } from 'src/db/models/survey_results/survey_results';

@Injectable()
export class SurveyResultsRepository {
  constructor(
    @Inject('SurveyResult') private modelClass: ModelClass<SurveyResult>,
  ) {}

  async getById(id: number) {
    try {
      const surveyResult: SurveyResult | undefined = await this.modelClass.query().findById(id);

      return surveyResult;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByOwnerId(owner_id: number) {
    try {
      const surveyResults: SurveyResult[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('user_id', '=', owner_id);

      return surveyResults;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(owner_id: number, survey_id: number, dto: CreateSurveyResultsDto) {
    try {
      const data: object = {
        user_id: owner_id,
        survey_id: survey_id,
        title: dto.title,
      };
      await this.modelClass.query().insert(data);
      return dto;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async changeTitle(id: number, dto: UpdateSurveyResultsDto) {
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
      const surveyResult: SurveyResult[] | undefined = await this.modelClass
        .query()
        .where('title', '=', title)
        .where('survey_results.user_id', '=', owner_id)
        .join('users', 'survey_results.user_id', '=', 'users.id')
        .select('survey_results.id', 'survey_results.title');

      return surveyResult[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
