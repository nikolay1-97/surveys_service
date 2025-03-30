import { Injectable, BadRequestException } from '@nestjs/common';
import { SurveysRepository } from 'src/db/repositories/surveys/repository';
import { CreateSurveysDto } from 'src/api/dto/surveys/surveysCreate.dto';
import { CreateSurveysResponseDto } from 'src/api/dtoResponse/surveys/surveysCreateResponse.dto';
import { UpdateSurveysDto } from 'src/api/dto/surveys/surveysUpdate.dto';
import { UpdateSurveysResponseDto } from 'src/api/dtoResponse/surveys/surveysUpdateResponse.dto';
import { DeleteSurveysResponseDto } from 'src/api/dtoResponse/surveys/surveysDeleteResponse.dto';
import { GetByOwnerIdSurveysResponseDto } from 'src/api/dtoResponse/surveys/surveysGetByOwnerIdResp.dto';

import { plainToInstance } from 'class-transformer';

@Injectable()
export class SurveysService {
  constructor(
    private readonly surveysRepository: SurveysRepository,
  ) {}

  async create(owner_id: number, dto: CreateSurveysDto): Promise<CreateSurveysResponseDto | undefined> {
    const survey = await this.surveysRepository.getByTitle(dto.title);

    if (!survey) {
      const data = {
        owner_id: owner_id,
        title: dto.title
      }
      await this.surveysRepository.create(data);
      return new CreateSurveysResponseDto({title: dto.title});
    }
    throw new BadRequestException('survey already exists');
  }

  async update(id: number, admin_id: number, dto: UpdateSurveysDto): Promise<UpdateSurveysResponseDto | undefined> {
    const survey = await this.surveysRepository.getByTitle(dto.title)
    if (survey) {
      throw new BadRequestException('survey already exists')
    }
    const data = {title: dto.title}
    await this.surveysRepository.changeTitle(id, data);
    return new UpdateSurveysResponseDto({title: dto.title});
  }

  async getByOwnerId(owner_id: number): Promise<GetByOwnerIdSurveysResponseDto[]> {
    const surveys = await this.surveysRepository.getByOwnerId(owner_id);

    return plainToInstance(GetByOwnerIdSurveysResponseDto, surveys);
  }

  async delete(id: number): Promise<DeleteSurveysResponseDto> {
    const survey = await this.surveysRepository.getById(id);

    if (!survey) {
      throw new BadRequestException('survey not found');
    }
    await this.surveysRepository.delete(id);
    return new DeleteSurveysResponseDto({
        id: survey.id,
        title: survey.title,
        created_at: survey.created_at,
    });
  }
  
}
