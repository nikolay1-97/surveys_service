import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSurveysResponseDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  constructor(partial: Partial<CreateSurveysResponseDto>) {
    Object.assign(this, partial);
  }
}
