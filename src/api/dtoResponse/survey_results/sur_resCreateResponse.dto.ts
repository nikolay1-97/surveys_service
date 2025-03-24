import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateSurveyResultsResponseDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  constructor(partial: Partial<CreateSurveyResultsResponseDto>) {
    Object.assign(this, partial);
  }
}
