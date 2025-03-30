import { Injectable, BadRequestException } from '@nestjs/common';
import { OptionsRepository } from 'src/db/repositories/options/repository';
import { CreateOptionDto } from 'src/api/dto/options/optionCreate.dto';
import { CreateOptionResponseDto } from 'src/api/dtoResponse/options/optionCreateResponse.dto';
import { ChangeTitleOptionDto } from 'src/api/dto/options/optionChangeTitle.dto';
import { ChangeTitleOptionResponseDto } from 'src/api/dtoResponse/options/optionChangeTitleResponse.dto';
import { GetByQuestionIdOptionResponseDto } from 'src/api/dtoResponse/options/optionGetByQuestionIdResponse.dto';
import { DeleteOptionResponseDto } from 'src/api/dtoResponse/options/optionDeleteResponse.dto';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class OptionsService {
  constructor(
    private readonly optionsRepository: OptionsRepository,
  ) {}

  async create(question_id: number, dto: CreateOptionDto): Promise<CreateOptionResponseDto> {
    const option = await this.optionsRepository.getByQuestionIdAndTitle(question_id, dto.title);

    if (!option) {
      const data = {
        question_id: question_id,
        title: dto.title,
    }
      await this.optionsRepository.create(data);
      return new CreateOptionResponseDto({question_id: question_id, title: dto.title});
    }
    throw new BadRequestException('option already exists');
  }

  async changeTitle(id: number, question_id: number, dto: ChangeTitleOptionDto): Promise<ChangeTitleOptionResponseDto> {
    const option = await this.optionsRepository.getByQuestionIdAndTitle(question_id, dto.title)
    if (option) {
      throw new BadRequestException('option already exists')
    }
    const data = {title: dto.title}
    await this.optionsRepository.changeTitle(id, data);
    return new ChangeTitleOptionResponseDto({title: dto.title});
  }


  async getBySurveyIdAndQuestionId(survey_id: number, question_id: number): Promise<GetByQuestionIdOptionResponseDto[]> {
    const options = await this.optionsRepository.getBySurveyIdAndQuestionId(survey_id, question_id);

    return plainToInstance(GetByQuestionIdOptionResponseDto, options);
  }

  async delete(id: number): Promise<DeleteOptionResponseDto> {
    const option = await this.optionsRepository.getById(id);

    if (!option) {
      throw new BadRequestException('option not found');
    }
    await this.optionsRepository.delete(id);
    return new DeleteOptionResponseDto({
        id: option.id,
        question_id: option.question_id,
        title: option.title,
        created_at: option.created_at,
    });
  }

}
