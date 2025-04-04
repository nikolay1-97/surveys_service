import { Injectable, BadRequestException } from '@nestjs/common';
import { QuestionsRepository } from 'src/db/repositories/questions/repository';
import { SurveysRepository } from 'src/db/repositories/surveys/repository';
import { CreateQuestionDto } from 'src/api/dto/questions/questionCreate.dto';
import { CreateQuestionResponseDto } from 'src/api/dtoResponse/questions/questionCreateResponse.dto';
import { ChangeQuestionQuestionDto } from 'src/api/dto/questions/questionChangeQuestion.dto';
import { ChangeQuestionQuestionResponseDto } from 'src/api/dtoResponse/questions/questionChangeQuestionResponse.dto';
import { ChangeTypeQuestionDto } from 'src/api/dto/questions/questionChangeType.dto';
import { ChangeTypeQuestionResponseDto } from 'src/api/dtoResponse/questions/questionChangeTypeResponse.dto';
import { GetBySurveyIdQuestionResponseDto } from 'src/api/dtoResponse/questions/questionGetBySurveyIdResponse.dto';
import { DeleteQuestionResponseDto } from 'src/api/dtoResponse/questions/questionDeleteResponse.dto';
import { plainToInstance } from 'class-transformer';
import { Questions } from 'src/db/models/questions/questions';
import { CreateQuestionType } from 'src/db/types/questions/createQuestion';
import { ChangeQuestion } from 'src/db/types/questions/changeQuestion';
import { ChangeQuestionType } from 'src/db/types/questions/changeQuestionType';


@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly surveysRepository: SurveysRepository,
  ) {}

  async create(survey_id: number, owner_id: number, dto: CreateQuestionDto): Promise<CreateQuestionResponseDto> {
    const survey = await this.surveysRepository.getItemByIdOwnerId(survey_id, owner_id)
    if (!survey) {
      throw new BadRequestException('survey not found')
    }
    const question = await this.questionsRepository.getBySurveyIdAndQuestion(survey_id, dto.question);

    if (!question) {
      const data: CreateQuestionType = {
        survey_id: survey_id,
        question: dto.question,
        type: dto.type,
      }
      const trx = await Questions.startTransaction()
      try {
        await this.questionsRepository.create(data, trx);
        await trx.commit()
        return new CreateQuestionResponseDto({survey_id: survey_id, question: dto.question, type: dto.type});
      } catch(e) {
        console.log(e)
        await trx.rollback()
        throw e
      }
    }
    throw new BadRequestException('question already exists');
  }

  async changeQuestion(id: number, survey_id: number, owner_id: number, dto: ChangeQuestionQuestionDto): Promise<ChangeQuestionQuestionResponseDto> {
    const survey = await this.surveysRepository.getItemByIdOwnerId(survey_id, owner_id)
    if (!survey) {
      throw new BadRequestException('survey not found')
    }
    const quest = await this.questionsRepository.getByIdOwnerId(id, owner_id)
    if (!quest) {
      throw new BadRequestException('question not found')
    }
    const question = await this.questionsRepository.getBySurveyIdAndQuestion(survey_id, dto.question)
    if (question) {
      throw new BadRequestException('question already exists')
    }
    const data: ChangeQuestion = {question: dto.question}
    const trx = await Questions.startTransaction()
    try {
      await this.questionsRepository.update(id, data, trx);
      await trx.commit()
      return new ChangeQuestionQuestionResponseDto({question: dto.question});
    } catch(e) {
      console.log(e)
      await trx.rollback()
      throw e
    }
  }

  async changeType(id: number, owner_id: number, dto: ChangeTypeQuestionDto): Promise<ChangeTypeQuestionResponseDto> {
    const quest = await this.questionsRepository.getByIdOwnerId(id, owner_id)
    if (!quest) {
      throw new BadRequestException('question not found')
    }
    const data: ChangeQuestionType = {type: dto.type}
    const trx = await Questions.startTransaction()
    try {
      await this.questionsRepository.update(id, data, trx);
      await trx.commit()
      return new ChangeTypeQuestionResponseDto({type: dto.type});
    } catch(e) {
      console.log(e)
      await trx.rollback()
      throw e
    }
  }

  async getBySurveyId(survey_id: number): Promise<GetBySurveyIdQuestionResponseDto[]> {
    const questions = await this.questionsRepository.getBySurveyId(survey_id);

    return plainToInstance(GetBySurveyIdQuestionResponseDto, questions);
  }

  async delete(id: number, owner_id: number): Promise<DeleteQuestionResponseDto> {
    const question = await this.questionsRepository.getByIdOwnerId(id, owner_id);

    if (!question) {
      throw new BadRequestException('question not found');
    }
    const trx = await Questions.startTransaction()
    try {
      await this.questionsRepository.delete(id, trx);
      await trx.commit()
      return new DeleteQuestionResponseDto({
        id: question.id,
        survey_id: question.survey_id,
        question: question.question,
        type: question.type,
        created_at: question.created_at,
    });
    } catch(e) {
      console.log(e)
      await trx.rollback()
      throw e
  }
  }

}
