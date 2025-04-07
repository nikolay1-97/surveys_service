import { Injectable } from '@nestjs/common';
import { AnswersOptionsRepository } from 'src/db/repositories/answers_options/repository';
import { plainToInstance } from 'class-transformer';
import { GetStatBySurveyIdResponseDto } from 'src/api/dtoResponse/answersOptions/getStatBySurveyId';

@Injectable()
export class AnswersOptionsService {
  constructor(
    private readonly answersOptionsrepository: AnswersOptionsRepository,
  ) {}

  async getStatBySurveyId(survey_id: number): Promise<GetStatBySurveyIdResponseDto> {
    const survey_stat =
      await this.answersOptionsrepository.getStatBySurveyId(survey_id);
    return plainToInstance(GetStatBySurveyIdResponseDto, survey_stat);
  }

}
