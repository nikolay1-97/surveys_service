import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class ChangeQuestionQuestionResponseDto {

  @ApiProperty()
  @IsString()
  readonly question: string;

  constructor(partial: Partial<ChangeQuestionQuestionResponseDto>) {
    Object.assign(this, partial);
  }
}
