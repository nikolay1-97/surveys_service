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
import { SurveyResultsService } from 'src/service/survey_results/survey_results.service';
import { CreateSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resCreateResponse.dto';
import { GetByUserIdSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resGetByUserIdResponse.dto';
import { DeleteSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resDeleteResponse.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserAuthGuard } from 'src/api/guards/user/userAuthGuard';
import { UserId } from 'src/api/decorators/users/getUserId';


  @UseGuards(UserAuthGuard)
  @ApiTags('Users/SurveyResults')
  @Controller('survey-results')
  export class SurveyResultsController {
    constructor(
      private readonly surveyResultsService: SurveyResultsService,
      private readonly jwtService: JwtService,
    ) {}
  
    @ApiResponse({ status: 200, type: CreateSurveyResultsResponseDto })
    @Post(':survey_id')
    async register(
        @UserId() userId: number,
        @Param('survey_id', ParseIntPipe) survey_id: number,
    ): Promise<CreateSurveyResultsResponseDto> {
        const survey_result = await this.surveyResultsService.create(userId, survey_id);
        return new CreateSurveyResultsResponseDto(survey_result);
    }
  }
  