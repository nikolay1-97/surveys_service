import { Injectable, BadRequestException } from '@nestjs/common';
import { SurveyResultsRepository } from 'src/db/repositories/survey_results/repository';
import { SurveysRepository } from 'src/db/repositories/surveys/repository';
import { UsersRepository } from 'src/db/repositories/users/repository';
import { CreateSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resCreateResponse.dto';
import { DeleteSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resDeleteResponse.dto';
import { GetByUserIdSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resGetByUserIdResponse.dto';
import { plainToInstance } from 'class-transformer';
import { SurveyResults } from 'src/db/models/survey_results/survey_results';
import { CreateSurResType } from 'src/db/types/surveyResults/createSurResType';

@Injectable()
export class SurveyResultsService {
  constructor(
    private readonly surveyResultsRepository: SurveyResultsRepository,
    private readonly surveyRepository: SurveysRepository,
  ) {}

  async create(
    owner_id: number,
    survey_id: number,
): Promise<CreateSurveyResultsResponseDto> {
    const survey = await this.surveyRepository.getById(survey_id)
    if (!survey) {
      throw new BadRequestException('survey not found')
    }
    
    const surveyResult = await this.surveyResultsRepository.getBySurveyIdAndOwnerId(survey_id, owner_id);

    if (!surveyResult) {
      const data: CreateSurResType = {
        user_id: owner_id,
        survey_id: survey_id,
      }
      const trx = await SurveyResults.startTransaction()
      try {
        await this.surveyResultsRepository.create(data, trx);
        await trx.commit()
        return new CreateSurveyResultsResponseDto({survey_id: survey_id});
      } catch(e) {
        console.log(e)
        await trx.rollback()
        throw e
      }
    }
    throw new BadRequestException('survey_result already exists');
  }

}
