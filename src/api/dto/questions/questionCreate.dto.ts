import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum QuestionTypes {
  singleChoice = 'single choice',
  multipleChoice = 'multiple choice',
  text = 'text',
}

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  readonly question: string;

  @ApiProperty()
  @IsString()
  @IsEnum(QuestionTypes)
  readonly type: QuestionTypes;
}
