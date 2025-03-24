import { Injectable, BadRequestException } from '@nestjs/common';
import { SurveyResultsRepository } from 'src/db/repositories/survey_results/repository';
import { UsersRepository } from 'src/db/repositories/users/repository';
import { CreateSurveyResultsDto } from 'src/api/dto/survey_results/sur_resCreate.dto';
import { CreateSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resCreateResponse.dto';
import { UpdateSurveyResultsDto } from 'src/api/dto/survey_results/sur_resUpdate.dto';
import { UpdateSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resUpdateResponse.dto';
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
    dto: CreateSurveyResultsDto,
): Promise<CreateSurveyResultsResponseDto | undefined> {
    const surveyResult = await this.surveyResultsRepository.getByTitleAndOwnerId(dto.title, owner_id);

    if (!surveyResult) {
      await this.surveyResultsRepository.create(owner_id, survey_id, dto);
      return new CreateSurveyResultsResponseDto({title: dto.title});
    }
    throw new BadRequestException('survey_result already exists');
  }

  async update(id: number, owner_id: number, dto: UpdateSurveyResultsDto): Promise<UpdateSurveyResultsResponseDto | undefined> {
    const surveyResult = await this.surveyResultsRepository.getByTitleAndOwnerId(dto.title, owner_id)
    const user = await this.usersRepository.getById(owner_id)
    if (!user) {
        throw new BadRequestException('user not found')
    }
    if (surveyResult) {
      throw new BadRequestException('survey_result already exists')
    }
    await this.surveyResultsRepository.changeTitle(id, dto);
    return new UpdateSurveyResultsResponseDto({title: dto.title});
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
        title: surveyResult.title,
        created_at: surveyResult.created_at,
    });
  }

}
