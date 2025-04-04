import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBySurveyIdQuestionResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsNumber()
  readonly survey_id: number;

  @ApiProperty()
  @IsString()
  readonly question: string;

  @ApiProperty()
  @IsString()
  readonly type: string;

  @ApiProperty()
  @IsString()
  readonly created_at: string;

  constructor(partial: Partial<GetBySurveyIdQuestionResponseDto>) {
    Object.assign(this, partial);
  }
}
