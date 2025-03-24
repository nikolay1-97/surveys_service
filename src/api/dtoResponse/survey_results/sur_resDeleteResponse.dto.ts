import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class DeleteSurveyResultsResponseDto {
  
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly created_at: string;

  constructor(partial: Partial<DeleteSurveyResultsResponseDto>) {
    Object.assign(this, partial);
  }
}
