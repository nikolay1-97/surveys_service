import { Injectable } from '@nestjs/common';
import { AnswersOptionsRepository } from 'src/db/repositories/answers_options/repository';


@Injectable()
export class AnswersOptionsService {
  constructor(
    private readonly answersOptionsrepository: AnswersOptionsRepository,
  ) {}

  async getStatBySurveyId(survey_id: number) {
    const survey_stat =
      await this.answersOptionsrepository.getStatBySurveyId(survey_id);
    return survey_stat;
  }

  async getStat() {
    const survey_stat = await this.answersOptionsrepository.getStat();
    return survey_stat;
  }
}
