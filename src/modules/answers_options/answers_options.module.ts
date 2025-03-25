import { Module } from '@nestjs/common';
import { AnswersOptionsService } from 'src/service/answers_options/answers_options.service';
import { AnswersOptionsRepository } from 'src/db/repositories/answers_options/repository';
import { OptionsRepository } from 'src/db/repositories/options/repository';
import { AnswersOptionsController } from 'src/api/controllers/answers_options/answers_options.controller';
import { AnswersOptions } from 'src/db/models/answersOptions/answersOptions';

@Module({
  controllers: [AnswersOptionsController],
  providers: [
    AnswersOptionsService,
    AnswersOptionsRepository,
    OptionsRepository,
    AnswersOptions,
  ],
})
export class AnswersOptionsModule {}
