import { Module } from '@nestjs/common';
import { SurveysService } from 'src/service/surveys/surveys.service';
import { SurveysRepository } from 'src/db/repositories/surveys/repository';
import { SurveysController } from 'src/api/controllers/surveys/surveys.controller';
import { Survey } from 'src/db/models/surveys/surveys';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [SurveysController],
  providers: [
    SurveysService,
    SurveysRepository,
    Survey,
    JwtService,
  ],
})
export class SurveysModule {}
