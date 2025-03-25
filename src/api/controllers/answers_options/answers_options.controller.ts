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
  
    @ApiResponse({ status: 200, type: CreateAnswersOptionsResponseDto })
    @Post('answers/:answer_id/options/:option_id')
    async register(
        @Param('answer_id', ParseIntPipe) answer_id: number,
        @Param('option_id', ParseIntPipe) option_id: number,
    ): Promise<CreateAnswersOptionsResponseDto> {
        return await this.answersOptionsService.create(answer_id, option_id);
    }
    
}
  