import { Injectable, Inject, Logger } from '@nestjs/common';
import { ModelClass } from 'objection';
import { SurveyResults } from 'src/db/models/survey_results/survey_results';
import { CreateSurResType } from 'src/db/types/surveyResults/createSurResType';

@Injectable()
export class SurveyResultsRepository {
  constructor(
    @Inject('SurveyResults') private modelClass: ModelClass<SurveyResults>,
    private readonly logger = new Logger(SurveyResultsRepository.name),
  ) {}

  async getById(id: number) {
    try {
      const item: SurveyResults | undefined = await this.modelClass
        .query()
        .findById(id);

      return item;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async create(data: CreateSurResType, trx) {
    try {
      return await this.modelClass.query(trx).insert(data);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async getBySurveyIdAndOwnerId(survey_id: number, owner_id: number) {
    try {
      const items: SurveyResults[] | undefined = await this.modelClass
        .query()
        .where('survey_id', '=', survey_id)
        .where('user_id', '=', owner_id)
        .select('survey_results.id');

      return items[0];
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
