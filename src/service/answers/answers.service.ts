import { Injectable, BadRequestException } from '@nestjs/common';
import { AnswersRepository } from 'src/db/repositories/answers/repository';
import { QuestionsRepository } from 'src/db/repositories/questions/repository';
import { CreateAnswersDto } from 'src/api/dto/answers/answerCreateDto';
import { CreateAnswersResponseDto } from 'src/api/dtoResponse/answers/answersCreateResponse.dto';


@Injectable()
export class AnswersService {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly questionsRepository: QuestionsRepository,
  ) {}

  async create(survey_result_id: number, question_id: number, dto: CreateAnswersDto): Promise<CreateAnswersResponseDto> {
    const question = await this.questionsRepository.getById(question_id)

    if (!question) {
        throw new BadRequestException('question not found')
    }
    const answer = await this.answersRepository.getBySurveyResultIdAndQuestionId(survey_result_id, question_id);

    if (!answer) {
      await this.answersRepository.create(survey_result_id, question_id, dto);
      return new CreateAnswersResponseDto({
        survey_results_id: survey_result_id,
        question_id: question_id,
        answer: dto.answer,
      });
    }
    throw new BadRequestException('answer already exists');
  }

}
