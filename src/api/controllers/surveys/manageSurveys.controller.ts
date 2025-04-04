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
import { SurveysService } from 'src/service/surveys/surveys.service';
import { QuestionsService } from 'src/service/questions/questions.service';
import { OptionsService } from 'src/service/options/options.service';
import { CreateSurveysDto } from 'src/api/dto/surveys/surveysCreate.dto';
import { CreateSurveysResponseDto } from 'src/api/dtoResponse/surveys/surveysCreateResponse.dto';
import { UpdateSurveysDto } from 'src/api/dto/surveys/surveysUpdate.dto';
import { UpdateSurveysResponseDto } from 'src/api/dtoResponse/surveys/surveysUpdateResponse.dto';
import { GetByOwnerIdSurveysResponseDto } from 'src/api/dtoResponse/surveys/surveysGetByOwnerIdResp.dto';
import { CreateQuestionResponseDto } from 'src/api/dtoResponse/questions/questionCreateResponse.dto';
import { CreateQuestionDto } from 'src/api/dto/questions/questionCreate.dto';
import { DeleteSurveysResponseDto } from 'src/api/dtoResponse/surveys/surveysDeleteResponse.dto';
import { ChangeQuestionQuestionDto } from 'src/api/dto/questions/questionChangeQuestion.dto';
import { ChangeQuestionQuestionResponseDto } from 'src/api/dtoResponse/questions/questionChangeQuestionResponse.dto';
import { ChangeTypeQuestionDto } from 'src/api/dto/questions/questionChangeType.dto';
import { ChangeTypeQuestionResponseDto } from 'src/api/dtoResponse/questions/questionChangeTypeResponse.dto';
import { DeleteQuestionResponseDto } from 'src/api/dtoResponse/questions/questionDeleteResponse.dto';
import { UserId } from 'src/api/decorators/users/getUserId';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AdminAuthGuard } from 'src/api/guards/admin/adminAuthGuard';
import { GetBySurveyIdQuestionResponseDto } from 'src/api/dtoResponse/questions/questionGetBySurveyIdResponse.dto';
import { CreateOptionDto } from 'src/api/dto/options/optionCreate.dto';
import { CreateOptionResponseDto } from 'src/api/dtoResponse/options/optionCreateResponse.dto';
import { ChangeTitleOptionDto } from 'src/api/dto/options/optionChangeTitle.dto';
import { ChangeTitleOptionResponseDto } from 'src/api/dtoResponse/options/optionChangeTitleResponse.dto';
import { GetByQuestionIdOptionResponseDto } from 'src/api/dtoResponse/options/optionGetByQuestionIdResponse.dto';
import { DeleteOptionResponseDto } from 'src/api/dtoResponse/options/optionDeleteResponse.dto';


@UseGuards(AdminAuthGuard)
@ApiTags('Admins/Surveys')
@Controller('admins/surveys')
export class ManageSurveysController {
    constructor(
      private readonly surveysService: SurveysService,
      private readonly questionsService: QuestionsService,
      private readonly optionsService: OptionsService,
      private readonly jwtService: JwtService,
    ) {}
  
    @ApiResponse({ status: 200, type: CreateSurveysResponseDto })
    @Post()
    async register(@Body() dto: CreateSurveysDto, @UserId() userId: number): Promise<CreateSurveysResponseDto> {
        const survey =  await this.surveysService.create(userId, dto);
        return new CreateSurveysResponseDto(survey)
    }
  
    @ApiResponse({ status: 200, type: UpdateSurveysResponseDto })
    @Patch(':id')
    async changeTitle(
      @Body() dto: UpdateSurveysDto,
      @UserId() userId: number,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<UpdateSurveysResponseDto> {
        const survey = await this.surveysService.changeTitle(id, userId, dto);
        return new UpdateSurveysResponseDto(survey);
    }
  
    @ApiResponse({ status: 200, type: [GetByOwnerIdSurveysResponseDto] })
    @Get()
    async getListByOwnerId(
      @UserId() userId: number,
    ): Promise<GetByOwnerIdSurveysResponseDto[]> {
        return await this.surveysService.getByOwnerId(userId);
    }
  
    @ApiResponse({ status: 200, type: DeleteSurveysResponseDto })
    @Delete(':id')
    async delete(
      @UserId() admin_id: number,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<DeleteSurveysResponseDto> {
      const survey = await this.surveysService.delete(id, admin_id);
      return new DeleteSurveysResponseDto(survey);
    }

    @ApiResponse({ status: 200, type: CreateQuestionResponseDto })
    @Post(':id/questions')
    async create(
      @UserId() admin_id: number,
      @Body() dto: CreateQuestionDto,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<CreateQuestionResponseDto> {
      const question = await this.questionsService.create(id, admin_id, dto);
      return new CreateQuestionResponseDto(question);
    }

    @ApiResponse({ status: 200, type: ChangeQuestionQuestionResponseDto })
    @Patch(':id/questions/:question_id')
    async changeQuestion(
      @UserId() admin_id: number,
      @Body() dto: ChangeQuestionQuestionDto,
      @Param('id', ParseIntPipe) id: number,
      @Param('question_id', ParseIntPipe) question_id: number,
    ): Promise<ChangeQuestionQuestionResponseDto> {
            
      const question = await this.questionsService.changeQuestion(question_id, id, admin_id, dto);
      return new ChangeQuestionQuestionResponseDto(question)
    }

    @ApiResponse({ status: 200, type: ChangeTypeQuestionResponseDto })
    @Patch('questions/:question_id')
    async changeType(
      @UserId() admin_id: number,
      @Body() dto: ChangeTypeQuestionDto,
      @Param('question_id', ParseIntPipe) question_id: number,
    ): Promise<ChangeTypeQuestionResponseDto> {
            
      const question = await this.questionsService.changeType(question_id, admin_id, dto);
      return new ChangeTypeQuestionResponseDto(question)
    }

    @ApiResponse({ status: 200, type: [GetBySurveyIdQuestionResponseDto] })
    @Get(':id/questions')
    async getBySurveyId(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<GetBySurveyIdQuestionResponseDto[]> {
        return await this.questionsService.getBySurveyId(id);
          
    }

    @ApiResponse({ status: 200, type: DeleteQuestionResponseDto })
    @Delete('questions/:id')
    async deleteQuestion(
      @UserId() admin_id: number,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<DeleteQuestionResponseDto> {
      const question = await this.questionsService.delete(id, admin_id);
      return new DeleteQuestionResponseDto(question)
    }

    @ApiResponse({ status: 200, type: CreateOptionResponseDto })
    @Post('questions/:id/options')
    async createOption(
      @UserId() admin_id: number,
      @Body() dto: CreateOptionDto,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<CreateOptionResponseDto> {
        const option = await this.optionsService.create(id, admin_id, dto);
        return new CreateOptionResponseDto(option)
    }

    @ApiResponse({ status: 200, type: ChangeTitleOptionResponseDto })
    @Patch('questions/:question_id/options/:id')
    async changeTitleOption(
      @UserId() admin_id: number,
      @Body() dto: ChangeTitleOptionDto,
      @Param('question_id', ParseIntPipe) question_id: number,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<ChangeTitleOptionResponseDto> {
            
      const option = await this.optionsService.changeTitle(id, question_id, admin_id, dto);
      return new ChangeTitleOptionResponseDto(option);
    }

    @ApiResponse({ status: 200, type: [GetByQuestionIdOptionResponseDto] })
    @Get('questions/:id/options')
    async getByQuestionId(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<GetByQuestionIdOptionResponseDto[]> {
        return await this.optionsService.getByQuestionId(id);
          
    }

    @ApiResponse({ status: 200, type: DeleteOptionResponseDto })
    @Delete('options/:id')
    async deleteOption(
      @UserId() admin_id: number,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<DeleteOptionResponseDto> {
      const option = await this.optionsService.delete(id, admin_id);
      return new DeleteOptionResponseDto(option);
    }

}
  