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
import { UserId } from 'src/api/decorators/users/getUserId';
import { UserAuthGuard } from 'src/api/guards/user/userAuthGuard';

  
  @UseGuards(UserAuthGuard)
  @ApiTags('Users/Answers')
  @Controller('answers')
  export class AnswersController {
    constructor(
      private readonly answersService: AnswersService,
      private readonly jwtService: JwtService,
    ) {}
  
    @ApiResponse({ status: 200, type: CreateAnswersResponseDto })
    @Post()
    async register(
        @UserId() userId: number,
        @Body() dto: CreateAnswersDto,
    ): Promise<CreateAnswersResponseDto> {
        const answer = await this.answersService.create(userId, dto);
        return new CreateAnswersResponseDto(answer);
        
    }
    
}
  