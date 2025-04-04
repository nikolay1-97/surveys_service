import {
  Controller,
  Post,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SurveyResultsService } from 'src/service/survey_results/survey_results.service';
import { CreateSurveyResultsResponseDto } from 'src/api/dtoResponse/survey_results/sur_resCreateResponse.dto';
import { JwtService } from '@nestjs/jwt';
import { UserAuthGuard } from 'src/api/guards/user/userAuthGuard';
import { UserId } from 'src/api/decorators/users/getUserId';

@UseGuards(UserAuthGuard)
@ApiTags('Users/SurveyResults')
@Controller('survey-results')
export class SurveyResultsController {
  constructor(
    private readonly surveyResultsService: SurveyResultsService,
  ) {}

  @ApiResponse({ status: 200, type: CreateSurveyResultsResponseDto })
  @Post(':survey_id')
  async register(
    @UserId() userId: number,
    @Param('survey_id', ParseIntPipe) survey_id: number,
  ): Promise<CreateSurveyResultsResponseDto> {
    const survey_result = await this.surveyResultsService.create(
      userId,
      survey_id,
    );
    return new CreateSurveyResultsResponseDto(survey_result);
  }
}
