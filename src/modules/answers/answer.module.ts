import { Module } from '@nestjs/common';
import { AnswersService } from 'src/service/answers/answers.service';
import { AnswersRepository } from 'src/db/repositories/answers/repository';
import { QuestionsRepository } from 'src/db/repositories/questions/repository';
import { AnswersOptionsRepository } from 'src/db/repositories/answers_options/repository';
import { OptionsRepository } from 'src/db/repositories/options/repository';
import { SurveyResultsRepository } from 'src/db/repositories/survey_results/repository';
import { AnswersController } from 'src/api/controllers/answers/answers.controller';
import { Answers } from 'src/db/models/answers/answers';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AnswersController],
  providers: [
    AnswersService,
    AnswersRepository,
    QuestionsRepository,
    AnswersOptionsRepository,
    OptionsRepository,
    SurveyResultsRepository,
    Answers,
    JwtService,
  ],
})
export class AnswersModule {}
