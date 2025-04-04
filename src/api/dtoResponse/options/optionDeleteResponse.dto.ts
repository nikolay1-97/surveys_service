import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteOptionResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsNumber()
  readonly question_id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly created_at: string;

  constructor(partial: Partial<DeleteOptionResponseDto>) {
    Object.assign(this, partial);
  }
}
