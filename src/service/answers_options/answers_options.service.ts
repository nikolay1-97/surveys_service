import { Injectable, BadRequestException } from '@nestjs/common';
import { AnswersOptionsRepository } from 'src/db/repositories/answers_options/repository';
import { CreateAnswersOptionsResponseDto } from 'src/api/dtoResponse/answers_options/answers_optionsCreateResponse.dto';
import { OptionsRepository } from 'src/db/repositories/options/repository';


@Injectable()
export class AnswersOptionsService {
  constructor(
    private readonly answersOptionsrepository: AnswersOptionsRepository,
    private readonly optionsRepository: OptionsRepository,
  ) {}

  async create(answer_id: number, option_id: number): Promise<CreateAnswersOptionsResponseDto> {
    const option = await this.optionsRepository.getByAnswerIdAndOptionId(answer_id, option_id);
    if (!option) {
        throw new BadRequestException('option not found')
    }

    const answerOption = await this.answersOptionsrepository.getBySurveyAnswerIdAndOptionId(
        answer_id,
        option_id,
    )

    if (!answerOption) {
        await this.answersOptionsrepository.create(answer_id, option_id)
        return new CreateAnswersOptionsResponseDto({answer_id: answer_id, option_id: option_id});
    }

    throw new BadRequestException('row of answer_result already exists')
    
  }

}
