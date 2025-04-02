import { Module } from '@nestjs/common';
import { SurveysService } from 'src/service/surveys/surveys.service';
import { SurveysRepository } from 'src/db/repositories/surveys/repository';
import { QuestionsService } from 'src/service/questions/questions.service';
import { QuestionsRepository } from 'src/db/repositories/questions/repository';
import { OptionsService } from 'src/service/options/options.service';
import { OptionsRepository } from 'src/db/repositories/options/repository';
import { Options } from 'src/db/models/options/options';
import { Questions } from 'src/db/models/questions/questions';
import { ManageSurveysController } from 'src/api/controllers/surveys/manageSurveys.controller';
import { UsersSurveysController } from 'src/api/controllers/surveys/usersSurveys.controller';
import { Surveys } from 'src/db/models/surveys/surveys';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ManageSurveysController, UsersSurveysController],
  providers: [
    SurveysService,
    SurveysRepository,
    QuestionsService,
    QuestionsRepository,
    OptionsService,
    OptionsRepository,
    Surveys,
    Questions,
    JwtService,
  ],
})
export class SurveysModule {}
