import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
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

  async create(data: object) {
    try {
      return await this.modelClass.query().insert(data);
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

  async getBySurveyIdAndOwnerId(
    survey_id: number,
    owner_id: number,
  ) {
    try {
      const surveyResult: SurveyResult[] | undefined = await this.modelClass
        .query()
        .where('survey_id', '=', survey_id)
        .where('user_id', '=', owner_id)
        .select('survey_results.id');

      return surveyResult[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
