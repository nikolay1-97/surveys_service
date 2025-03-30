import { Injectable, BadRequestException } from '@nestjs/common';
import { QuestionsRepository } from 'src/db/repositories/questions/repository';
import { CreateQuestionDto } from 'src/api/dto/questions/questionCreateResponse.dto';
import { CreateQuestionResponseDto } from 'src/api/dtoResponse/questions/questionCreateResponse.dto';
import { ChangeQuestionQuestionDto } from 'src/api/dto/questions/questionChangeQuestion.dto';
import { ChangeQuestionQuestionResponseDto } from 'src/api/dtoResponse/questions/questionChangeQuestionResponse.dto';
import { ChangeTypeQuestionDto } from 'src/api/dto/questions/questionChangeType.dto';
import { ChangeTypeQuestionResponseDto } from 'src/api/dtoResponse/questions/questionChangeTypeResponse.dto';
import { GetBySurveyIdQuestionResponseDto } from 'src/api/dtoResponse/questions/questionGetBySurveyIdResponse.dto';
import { DeleteQuestionResponseDto } from 'src/api/dtoResponse/questions/questionDeleteResponse.dto';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
  ) {}

  async create(survey_id: number, dto: CreateQuestionDto): Promise<CreateQuestionResponseDto> {
    const question = await this.questionsRepository.getBySurveyIdAndQuestion(survey_id, dto.question);

    if (!question) {
      const data = {
        survey_id: survey_id,
        question: dto.question,
        type: dto.type,
      }
      await this.questionsRepository.create(data);
      return new CreateQuestionResponseDto({survey_id: survey_id, question: dto.question, type: dto.type});
    }
    throw new BadRequestException('question already exists');
  }

  async changeQuestion(id: number, survey_id: number, dto: ChangeQuestionQuestionDto): Promise<ChangeQuestionQuestionResponseDto> {
    const question = await this.questionsRepository.getBySurveyIdAndQuestion(survey_id, dto.question)
    if (question) {
      throw new BadRequestException('question already exists')
    }
    const data = {question: dto.question}
    await this.questionsRepository.changeQuestion(id, data);
    return new ChangeQuestionQuestionResponseDto({question: dto.question});
  }

  async changeType(id: number, survey_id: number, dto: ChangeTypeQuestionDto): Promise<ChangeTypeQuestionResponseDto> {
    const data = {type: dto.type}
    await this.questionsRepository.changeType(id, data);
    return new ChangeTypeQuestionResponseDto({type: dto.type});
  }

  async getBySurveyId(survey_id: number): Promise<GetBySurveyIdQuestionResponseDto[]> {
    const questions = await this.questionsRepository.getBySurveyId(survey_id);

    return plainToInstance(GetBySurveyIdQuestionResponseDto, questions);
  }

  async delete(id: number): Promise<DeleteQuestionResponseDto> {
    const question = await this.questionsRepository.getById(id);

    if (!question) {
      throw new BadRequestException('question not found');
    }
    await this.questionsRepository.delete(id);
    return new DeleteQuestionResponseDto({
        id: question.id,
        survey_id: question.survey_id,
        question: question.question,
        type: question.type,
        created_at: question.created_at,
    });
  }

}
