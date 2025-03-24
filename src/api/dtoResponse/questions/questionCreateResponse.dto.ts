import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateQuestionResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly survey_id: number;

  @ApiProperty()
  @IsString()
  readonly question: string;

  @ApiProperty()
  @IsString()
  readonly type: string;

  constructor(partial: Partial<CreateQuestionResponseDto>) {
    Object.assign(this, partial);
  }
}
