import { Module } from '@nestjs/common';
import { SurveysService } from 'src/service/surveys/surveys.service';
import { SurveysRepository } from 'src/db/repositories/surveys/repository';
import { SurveysController } from 'src/api/controllers/surveys/surveys.controller';
import { Surveys } from 'src/db/models/surveys/surveys';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [SurveysController],
  providers: [
    SurveysService,
    SurveysRepository,
    Surveys,
    JwtService,
  ],
})
export class SurveysModule {}
