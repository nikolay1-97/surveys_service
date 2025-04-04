import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class GetSurveysResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @Exclude()
  owner_id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @Exclude()
  readonly created_at: string;

  constructor(partial: Partial<GetSurveysResponseDto>) {
    Object.assign(this, partial);
  }
}
