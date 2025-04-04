import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetByQuestionIdOptionResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsNumber()
  readonly option_id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly created_at: string;

  constructor(partial: Partial<GetByQuestionIdOptionResponseDto>) {
    Object.assign(this, partial);
  }
}
