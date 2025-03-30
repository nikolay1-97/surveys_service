import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Req,
    Param,
    ParseIntPipe,
    UseGuards,
  } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnswersOptionsService } from 'src/service/answers_options/answers_options.service';
import { CreateAnswersOptionsResponseDto } from 'src/api/dtoResponse/answers_options/answers_optionsCreateResponse.dto';

  
  @ApiTags('Users')
  @Controller('answers-options')
  export class AnswersOptionsController {
    constructor(
      private readonly answersOptionsService: AnswersOptionsService,
    ) {}

    //@ApiResponse({ status: 200, type: [GetBySurveyIdQuestionResponseDto] })
    @Get('surveys/:survey_id')
    async getBySurveyId(
        @Param('survey_id', ParseIntPipe) survey_id: number,
    ) {
        return await this.answersOptionsService.getStatBySurveyId(survey_id);
          
    }
    
}
  