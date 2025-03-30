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
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

  
  @ApiTags('Users')
  @Controller('answers')
  export class AnswersController {
    constructor(
      private readonly answersService: AnswersService,
      private readonly jwtService: JwtService,
    ) {}
  
    @ApiResponse({ status: 200, type: CreateAnswersResponseDto })
    @Post('survey-results/:survey_results_id/questions/:question_id')
    async register(
        @Req() request: Request,
        @Body() dto: CreateAnswersDto,
        @Param('survey_results_id', ParseIntPipe) survey_results_id: number,
        @Param('question_id', ParseIntPipe) question_id: number,
    ): Promise<CreateAnswersResponseDto | undefined> {
      const token = request.headers.authorization;
      if (token) {
        const payload = this.jwtService.decode(token.substring(7, token.length));
        const user_id = payload.sub;
        if (user_id) {
            return await this.answersService.create(survey_results_id, question_id, user_id, dto);
        }
      }
    }
    
}
  