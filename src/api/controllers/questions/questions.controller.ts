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
import { QuestionsService } from 'src/service/questions/questions.service';
import { CreateQuestionDto } from 'src/api/dto/questions/questionCreateResponse.dto';
import { CreateQuestionResponseDto } from 'src/api/dtoResponse/questions/questionCreateResponse.dto';
import { ChangeQuestionQuestionDto } from 'src/api/dto/questions/questionChangeQuestion.dto';
import { ChangeQuestionQuestionResponseDto } from 'src/api/dtoResponse/questions/questionChangeQuestionResponse.dto';
import { ChangeTypeQuestionDto } from 'src/api/dto/questions/questionChangeType.dto';
import { ChangeTypeQuestionResponseDto } from 'src/api/dtoResponse/questions/questionChangeTypeResponse.dto';
import { GetBySurveyIdQuestionResponseDto } from 'src/api/dtoResponse/questions/questionGetBySurveyIdResponse.dto';
import { DeleteQuestionResponseDto } from 'src/api/dtoResponse/questions/questionDeleteResponse.dto';
import { JwtService } from '@nestjs/jwt';

  
  @Controller('questions')
  export class QuestionsController {
    constructor(
      private readonly questionsService: QuestionsService,
      private readonly jwtService: JwtService,
    ) {}
  
    @ApiTags('Admins')
    @ApiResponse({ status: 200, type: CreateQuestionResponseDto })
    @Post('surveys/:survey_id')
    async register(
        @Body() dto: CreateQuestionDto,
        @Param('survey_id', ParseIntPipe) survey_id: number,
    ): Promise<CreateQuestionResponseDto> {
        return await this.questionsService.create(survey_id, dto);
    }
  
    @ApiTags('Admins')
    @ApiResponse({ status: 200, type: ChangeQuestionQuestionResponseDto })
    @Patch('survey/:survey_id/questions/:question_id')
    async changeQuestion(
      @Body() dto: ChangeQuestionQuestionDto,
      @Param('survey_id', ParseIntPipe) survey_id: number,
      @Param('question_id', ParseIntPipe) question_id: number,
    ): Promise<ChangeQuestionQuestionResponseDto> {
        
        return await this.questionsService.changeQuestion(question_id, survey_id, dto);
    }

    @ApiTags('Admins')
    @ApiResponse({ status: 200, type: ChangeTypeQuestionResponseDto })
    @Patch('surveys/:survey_id/questions/:question_id')
    async changeType(
      @Body() dto: ChangeTypeQuestionDto,
      @Param('survey_id', ParseIntPipe) survey_id: number,
      @Param('question_id', ParseIntPipe) question_id: number,
    ): Promise<ChangeTypeQuestionResponseDto> {
        
        return await this.questionsService.changeType(question_id, survey_id, dto);
    }
  
    @ApiResponse({ status: 200, type: [GetBySurveyIdQuestionResponseDto] })
    @Get('surveys/:survey_id')
    async getBySurveyId(
        @Param('survey_id', ParseIntPipe) survey_id: number,
    ): Promise<GetBySurveyIdQuestionResponseDto[]> {
          return await this.questionsService.getBySurveyId(survey_id);
      
    }
  
    @ApiTags('Admins')
    @ApiResponse({ status: 200, type: DeleteQuestionResponseDto })
    @Delete('surveys/:survey_id/questions/:question_id')
    async delete(
      @Param('survey_id', ParseIntPipe) survey_id: number,
      @Param('question_id', ParseIntPipe) question_id: number,
    ): Promise<DeleteQuestionResponseDto> {
      return await this.questionsService.delete(question_id);
    }
  }
  