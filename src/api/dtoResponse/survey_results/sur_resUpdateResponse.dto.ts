import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateSurveyResultsResponseDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  constructor(partial: Partial<UpdateSurveyResultsResponseDto>) {
    Object.assign(this, partial);
  }
}
