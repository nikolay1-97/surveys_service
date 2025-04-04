import { Injectable, BadRequestException } from '@nestjs/common';
import { AnswersRepository } from 'src/db/repositories/answers/repository';
import { QuestionsRepository } from 'src/db/repositories/questions/repository';
import { AnswersOptionsRepository } from 'src/db/repositories/answers_options/repository';
import { OptionsRepository } from 'src/db/repositories/options/repository';
import { SurveyResultsRepository } from 'src/db/repositories/survey_results/repository';
import { CreateAnswersDto } from 'src/api/dto/answers/answerCreateDto';
import { CreateAnswersResponseDto } from 'src/api/dtoResponse/answers/answersCreateResponse.dto';
import { CreateAnswersOptionsType } from 'src/db/types/answersOptions/answersOptionsType';
import { CreateAnswersType } from 'src/db/types/answers/createAnswersType';
import { Answers } from 'src/db/models/answers/answers';

@Injectable()
export class AnswersService {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly questionsRepository: QuestionsRepository,
    private readonly answersOptionsRepository: AnswersOptionsRepository,
    private readonly optionRepository: OptionsRepository,
    private readonly surResRepository: SurveyResultsRepository,
  ) {}

  async create(
    user_id: number,
    dto: CreateAnswersDto,
  ): Promise<CreateAnswersResponseDto> {
    const surRes = await this.surResRepository.getById(dto.survey_results_id);
    if (!surRes) {
      throw new BadRequestException('survey_result not found');
    }
    const question = await this.questionsRepository.getById(dto.question_id);

    if (!question) {
      throw new BadRequestException('question not found');
    }
    const answer =
      await this.answersRepository.getBySurveyResultIdQuestionIdUserId(
        dto.survey_results_id,
        dto.question_id,
        user_id,
      );

    if (!answer) {
      if (dto.options.length === 1) {
        const option = await this.optionRepository.getById(dto.options[0]);
        if (!option) {
          throw new BadRequestException('option not found');
        }
      } else {
        for (let cnt = 0; cnt <= dto.options.length - 1; cnt++) {
          const option = await this.optionRepository.getById(dto.options[cnt]);
          if (!option) {
            throw new BadRequestException('option not found');
          }
        }
      }
      const data: CreateAnswersType = {
        user_id: user_id,
        survey_results_id: dto.survey_results_id,
        question_id: dto.question_id,
        answer: dto.answer,
      };
      const trx = await Answers.startTransaction();
      try {
        const answer = await this.answersRepository.create(data, trx);
        const answOptData = new Array<CreateAnswersOptionsType>();
        if (dto.options.length === 1) {
          const answOptItem: CreateAnswersOptionsType = {
            answer_id: answer.id,
            option_id: dto.options[0],
          };
          answOptData.push(answOptItem);
        } else {
          for (let cnt = 0; cnt <= dto.options.length - 1; cnt++) {
            const answOptItem: CreateAnswersOptionsType = {
              answer_id: answer.id,
              option_id: dto.options[cnt],
            };
            answOptData.push(answOptItem);
          }
        }
        await this.answersOptionsRepository.create(answOptData, trx);
        await trx.commit();
        return new CreateAnswersResponseDto({
          survey_results_id: dto.survey_results_id,
          question_id: dto.question_id,
          answer: dto.answer,
        });
      } catch (e) {
        await trx.rollback();
        throw e;
      }
    }
    throw new BadRequestException('answer already exists');
  }
}
