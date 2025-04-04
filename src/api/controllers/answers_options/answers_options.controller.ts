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
import { AnswersOptionsService } from 'src/service/answers_options/answers_options.service';
import { CreateAnswersOptionsResponseDto } from 'src/api/dtoResponse/answers_options/answers_optionsCreateResponse.dto';
import { GetStatBySurveyIdResponseDto } from 'src/api/dtoResponse/answersOptions/getStatBySurveyId';
import { GetStatResponseDto } from 'src/api/dtoResponse/answersOptions/getStatResponse';

  
  @ApiTags('Admins/AnswersOptions')
  @Controller('answers-options')
  export class AnswersOptionsController {
    constructor(
      private readonly answersOptionsService: AnswersOptionsService,
    ) {}

    @ApiResponse({ status: 200, type: GetStatBySurveyIdResponseDto })
    @Get(':survey_id')
    async getStatBySurveyId(
        @Param('survey_id', ParseIntPipe) survey_id: number,
    ) {
        return await this.answersOptionsService.getStatBySurveyId(survey_id);
          
    }
    
    @ApiResponse({ status: 200, type: GetStatResponseDto })
    @Get()
    async getStat(
    ) {
        return await this.answersOptionsService.getStat();
          
    }
    
}
  