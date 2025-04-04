import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeQuestionQuestionDto {
  @ApiProperty()
  @IsString()
  readonly question: string;
}
