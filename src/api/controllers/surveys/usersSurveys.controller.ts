import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Req,
    Param,
    Query,
    ParseIntPipe,
    UseGuards,
  } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SurveysService } from 'src/service/surveys/surveys.service';
import { QuestionsService } from 'src/service/questions/questions.service';
import { OptionsService } from 'src/service/options/options.service';
import { GetSurveysResponseDto } from 'src/api/dtoResponse/surveys/users/getSurveys';
import { GetQuestionsResponseDto } from 'src/api/dtoResponse/questions/users/getQuestions';
import { GetOptionsResponseDto } from 'src/api/dtoResponse/options/users/getOptions';


@ApiTags('Users')
@Controller('surveys')
export class UsersSurveysController {
    constructor(
      private readonly surveysService: SurveysService,
      private readonly questionsService: QuestionsService,
      private readonly optionsService: OptionsService,
    ) {}
  
  
    @ApiResponse({ status: 200, type: [GetSurveysResponseDto] })
    @Get()
    async getAll(): Promise<GetSurveysResponseDto[]> {
        return await this.surveysService.getAll();
    }

    @ApiResponse({ status: 200, type: [GetQuestionsResponseDto] })
    @Get('questions')
    async getBySurveyId(
      @Query('id', ParseIntPipe) id: number,
    ): Promise<GetQuestionsResponseDto[]> {
        return await this.questionsService.getBySurveyId(id);
          
    }

    @ApiResponse({ status: 200, type: [GetOptionsResponseDto] })
    @Get('questions/:id/options')
    async getByQuestionId(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<GetOptionsResponseDto[]> {
        return await this.optionsService.getByQuestionId(id);
          
    }

}
  