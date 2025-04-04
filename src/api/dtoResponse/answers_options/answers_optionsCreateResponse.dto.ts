import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswersOptionsResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly answer_id: number;

  @ApiProperty()
  @IsNumber()
  readonly option_id: number;

  constructor(partial: Partial<CreateAnswersOptionsResponseDto>) {
    Object.assign(this, partial);
  }
}
