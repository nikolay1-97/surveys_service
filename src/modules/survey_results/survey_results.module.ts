import { Module } from '@nestjs/common';
import { SurveyResultsService } from 'src/service/survey_results/survey_results.service';
import { PasswordService } from 'src/feature-md/password/password.service';
import { SurveyResultsRepository } from 'src/db/repositories/survey_results/repository';
import { SurveysRepository } from 'src/db/repositories/surveys/repository';
import { UsersRepository } from 'src/db/repositories/users/repository';
import { SurveyResultsController } from 'src/api/controllers/survey_results/survey_results.controller';
import { SurveyResults } from 'src/db/models/survey_results/survey_results';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [SurveyResultsController],
  providers: [
    SurveyResultsService,
    PasswordService,
    SurveyResultsRepository,
    SurveysRepository,
    UsersRepository,
    SurveyResults,
    JwtService,
  ],
})
export class SurveyResultsModule {}
