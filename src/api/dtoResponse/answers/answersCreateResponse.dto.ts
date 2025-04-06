import { IsString, IsNumber, IsArray } from 'class-validator';
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

  @IsArray()
  @ApiProperty()
  readonly options: Array<number>;

  constructor(partial: Partial<CreateAnswersResponseDto>) {
    Object.assign(this, partial);
  }
}
