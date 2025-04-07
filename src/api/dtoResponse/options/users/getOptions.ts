import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOptionsResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsNumber()
  readonly option_id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  constructor(partial: Partial<GetOptionsResponseDto>) {
    Object.assign(this, partial);
  }
}
