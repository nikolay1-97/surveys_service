import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateOptionResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly question_id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  constructor(partial: Partial<CreateOptionResponseDto>) {
    Object.assign(this, partial);
  }
}
