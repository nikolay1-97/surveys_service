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
import { SurveyResultsService } from 'src/service/survey_results/survey_results.service';
import { CreateSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resCreateResponse.dto';
import { GetByUserIdSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resGetByUserIdResponse.dto';
import { DeleteSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resDeleteResponse.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserAuthGuard } from 'src/api/guards/user/userAuthGuard';
import { User } from 'src/api/decorators/users/getUser';
import { Users } from 'src/db/models/users/users';

  
  @UseGuards(UserAuthGuard)
  @Controller('survey-results')
  export class SurveyResultsController {
    constructor(
      private readonly surveyResultsService: SurveyResultsService,
      private readonly jwtService: JwtService,
    ) {}
  
    @ApiTags('Users')
    @ApiResponse({ status: 200, type: CreateSurveyResultsResponseDto })
    @Post(':survey_id')
    async register(
        @User() user: Users,
        @Param('survey_id', ParseIntPipe) survey_id: number,
    ): Promise<CreateSurveyResultsResponseDto | undefined> {
        return await this.surveyResultsService.create(user.id, survey_id);
    }
  
    //@ApiTags('Users')
    //@ApiResponse({ status: 200, type: [GetByUserIdSurveyResultsResponseDto] })
    //@Get()
    //async getListByOwnerId(
      //@Req() request: Request,
    //): Promise<GetByUserIdSurveyResultsResponseDto[] | undefined> {
      //const token = request.headers.authorization;
      //if (token) {
        //const payload = this.jwtService.decode(token.substring(7, token.length));
        //const user_id = payload.sub;
        //if (user_id) {
          //return await this.surveyResultsService.getByOwnerId(user_id);
        //}
      //}
    //}
  
    @ApiTags('Admins')
    @ApiResponse({ status: 200, type: DeleteSurveyResultsResponseDto })
    @Delete(':surveyResultId')
    async delete(
      @Param('surveyResultId', ParseIntPipe) surveyResultId: number,
    ): Promise<DeleteSurveyResultsResponseDto> {
      return await this.surveyResultsService.delete(surveyResultId);
    }
  }
  