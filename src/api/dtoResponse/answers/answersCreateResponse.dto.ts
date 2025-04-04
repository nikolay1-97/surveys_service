import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswersResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly survey_results_id: number;

  @ApiProperty()
  @IsNumber()
  readonly question_id: number;

  @ApiProperty()
  @IsString()
  readonly answer: string;

  constructor(partial: Partial<CreateAnswersResponseDto>) {
    Object.assign(this, partial);
  }
}
