import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateSurveyResultsDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

}
