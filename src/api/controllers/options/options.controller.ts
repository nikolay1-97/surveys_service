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
import { OptionsService } from 'src/service/options/options.service';
import { CreateOptionDto } from 'src/api/dto/options/optionCreate.dto';
import { CreateOptionResponseDto } from 'src/api/dtoResponse/options/optionCreateResponse.dto';
import { ChangeTitleOptionDto } from 'src/api/dto/options/optionChangeTitle.dto';
import { ChangeTitleOptionResponseDto } from 'src/api/dtoResponse/options/optionChangeTitleResponse.dto';
import { GetByQuestionIdOptionResponseDto } from 'src/api/dtoResponse/options/optionGetByQuestionIdResponse.dto';
import { DeleteOptionResponseDto } from 'src/api/dtoResponse/options/optionDeleteResponse.dto';
import { JwtService } from '@nestjs/jwt';

  
  @Controller('options')
  export class OptionsController {
    constructor(
      private readonly optionsService: OptionsService,
      private readonly jwtService: JwtService,
    ) {}
  
    @ApiTags('Admins')
    @ApiResponse({ status: 200, type: CreateOptionResponseDto })
    @Post('surveys/:survey_id/questions/:question_id')
    async register(
        @Body() dto: CreateOptionDto,
        @Param('survey_id', ParseIntPipe) survey_id: number,
        @Param('question_id', ParseIntPipe) question_id: number,
    ): Promise<CreateOptionResponseDto> {
        return await this.optionsService.create(question_id, dto);
    }
  
    @ApiTags('Admins')
    @ApiResponse({ status: 200, type: ChangeTitleOptionResponseDto })
    @Patch('survey/:survey_id/questions/:question_id/options/:option_id')
    async changeTitle(
      @Body() dto: ChangeTitleOptionDto,
      @Param('survey_id', ParseIntPipe) survey_id: number,
      @Param('question_id', ParseIntPipe) question_id: number,
      @Param('option_id', ParseIntPipe) option_id: number,
    ): Promise<ChangeTitleOptionResponseDto> {
        
        return await this.optionsService.changeTitle(option_id, question_id, dto);
    }

    @ApiResponse({ status: 200, type: [GetByQuestionIdOptionResponseDto] })
    @Get('surveys/:survey_id/questions/:question_id')
    async getBySurveyId(
        @Param('survey_id', ParseIntPipe) survey_id: number,
        @Param('question_id', ParseIntPipe) question_id: number,
    ): Promise<GetByQuestionIdOptionResponseDto[]> {
          return await this.optionsService.getBySurveyIdAndQuestionId(survey_id, question_id);
      
    }
  
    @ApiTags('Admins')
    @ApiResponse({ status: 200, type: DeleteOptionResponseDto })
    @Delete('surveys/:survey_id/questions/:question_id/options/:option_id')
    async delete(
      @Param('survey_id', ParseIntPipe) survey_id: number,
      @Param('question_id', ParseIntPipe) question_id: number,
      @Param('option_id', ParseIntPipe) option_id: number,
    ): Promise<DeleteOptionResponseDto> {
      return await this.optionsService.delete(option_id);
    }
  }
  