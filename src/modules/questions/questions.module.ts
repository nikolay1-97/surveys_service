import { Module } from '@nestjs/common';
import { QuestionsService } from 'src/service/questions/questions.service';
import { QuestionsRepository } from 'src/db/repositories/questions/repository';
import { QuestionsController } from 'src/api/controllers/questions/questions.controller';
import { Question } from 'src/db/models/questions/questions';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    QuestionsRepository,
    Question,
    JwtService,
  ],
})
export class QuestionsModule {}
