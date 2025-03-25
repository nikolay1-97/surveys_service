import { Module } from '@nestjs/common';
import { AnswersService } from 'src/service/answers/answers.service';
import { AnswersRepository } from 'src/db/repositories/answers/repository';
import { QuestionsRepository } from 'src/db/repositories/questions/repository';
import { AnswersController } from 'src/api/controllers/answers/answers.controller';
import { Answer } from 'src/db/models/answers/answers';

@Module({
  controllers: [AnswersController],
  providers: [
    AnswersService,
    AnswersRepository,
    QuestionsRepository,
    Answer,
  ],
})
export class AnswersModule {}
