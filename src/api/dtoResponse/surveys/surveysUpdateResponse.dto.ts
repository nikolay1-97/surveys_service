import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSurveysResponseDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  constructor(partial: Partial<UpdateSurveysResponseDto>) {
    Object.assign(this, partial);
  }
}
