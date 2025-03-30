import { Injectable, BadRequestException } from '@nestjs/common';
import { SurveyResultsRepository } from 'src/db/repositories/survey_results/repository';
import { UsersRepository } from 'src/db/repositories/users/repository';
import { CreateSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resCreateResponse.dto';
import { DeleteSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resDeleteResponse.dto';
import { GetByUserIdSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resGetByUserIdResponse.dto';

import { plainToInstance } from 'class-transformer';

@Injectable()
export class SurveyResultsService {
  constructor(
    private readonly surveyResultsRepository: SurveyResultsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(
    owner_id: number,
    survey_id: number,
): Promise<CreateSurveyResultsResponseDto | undefined> {
    const surveyResult = await this.surveyResultsRepository.getBySurveyIdAndOwnerId(survey_id, owner_id);

    if (!surveyResult) {
      const data = {
        user_id: owner_id,
        survey_id: survey_id,
      }
      await this.surveyResultsRepository.create(data);
      return new CreateSurveyResultsResponseDto({survey_id: survey_id});
    }
    throw new BadRequestException('survey_result already exists');
  }


  async getByOwnerId(owner_id: number): Promise<GetByUserIdSurveyResultsResponseDto[]> {
    const surveyResults = await this.surveyResultsRepository.getByOwnerId(owner_id);

    return plainToInstance(GetByUserIdSurveyResultsResponseDto, surveyResults);
  }

  async delete(id: number): Promise<DeleteSurveyResultsResponseDto> {
    const surveyResult = await this.surveyResultsRepository.getById(id);

    if (!surveyResult) {
      throw new BadRequestException('surveyResult not found');
    }
    await this.surveyResultsRepository.delete(id);
    return new DeleteSurveyResultsResponseDto({
        id: surveyResult.id,
        created_at: surveyResult.created_at,
    });
  }

}
