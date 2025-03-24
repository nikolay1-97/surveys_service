import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeTitleOptionResponseDto {

  @ApiProperty()
  @IsString()
  readonly title: string;

  constructor(partial: Partial<ChangeTitleOptionResponseDto>) {
    Object.assign(this, partial);
  }
}
