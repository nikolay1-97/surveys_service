import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnswersOptionsService } from 'src/service/answers_options/answers_options.service';
import { GetStatBySurveyIdResponseDto } from 'src/api/dtoResponse/answersOptions/getStatBySurveyId';
import { AdminsAuthGuard } from 'src/api/guards/admin/adminAuthGuard';
import { plainToInstance } from 'class-transformer';

@UseGuards(AdminsAuthGuard)
@ApiTags('Admins/AnswersOptions')
@Controller('answers-options')
export class AnswersOptionsController {
  constructor(private readonly answersOptionsService: AnswersOptionsService) {}

  @ApiResponse({ status: 200, type: GetStatBySurveyIdResponseDto })
  @Get(':survey_id')
  async getStatBySurveyId(
    @Param('survey_id', ParseIntPipe) survey_id: number,
  ): Promise<GetStatBySurveyIdResponseDto> {
    const stat = await this.answersOptionsService.getStatBySurveyId(survey_id);
    return plainToInstance(GetStatBySurveyIdResponseDto, stat);
  }
}
