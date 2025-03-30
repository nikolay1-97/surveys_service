import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateSurveyResultsResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly survey_id: number;

  constructor(partial: Partial<CreateSurveyResultsResponseDto>) {
    Object.assign(this, partial);
  }
}
