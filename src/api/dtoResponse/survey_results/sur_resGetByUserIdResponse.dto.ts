import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';


export class GetByUserIdSurveyResultsResponseDto {

  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @Exclude()
  user_id: number;


  @ApiProperty()
  @IsString()
  readonly created_at: string;

  constructor(partial: Partial<GetByUserIdSurveyResultsResponseDto>) {
    Object.assign(this, partial);
  }
}
