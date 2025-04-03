import { IsString, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateAnswersDto {
  @ApiProperty()
  @IsNumber()
  readonly survey_results_id: number;

  @ApiProperty()
  @IsNumber()
  readonly question_id: number;
  
  @ApiProperty()
  @IsString()
  readonly answer: string;
  
  @ApiProperty()
  @IsArray()
  readonly options: [number]

}
