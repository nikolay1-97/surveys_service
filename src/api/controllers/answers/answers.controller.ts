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
import { AnswersService } from 'src/service/answers/answers.service';
import { CreateAnswersDto } from 'src/api/dto/answers/answerCreateDto';
import { CreateAnswersResponseDto } from 'src/api/dtoResponse/answers/answersCreateResponse.dto';

  
  @ApiTags('Users')
  @Controller('answers')
  export class AnswersController {
    constructor(
      private readonly answersService: AnswersService,
    ) {}
  
    @ApiResponse({ status: 200, type: CreateAnswersResponseDto })
    @Post('survey-results/:survey_results_id/questions/:question_id')
    async register(
        @Body() dto: CreateAnswersDto,
        @Param('survey_results_id', ParseIntPipe) survey_results_id: number,
        @Param('question_id', ParseIntPipe) question_id: number,
    ): Promise<CreateAnswersResponseDto> {
        return await this.answersService.create(survey_results_id, question_id, dto);
    }
    
}
  