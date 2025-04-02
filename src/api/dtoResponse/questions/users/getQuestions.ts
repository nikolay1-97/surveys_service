import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';


export class GetQuestionsResponseDto {
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

  @Exclude()
  readonly created_at: string;

  constructor(partial: Partial<GetQuestionsResponseDto>) {
    Object.assign(this, partial);
  }
}
