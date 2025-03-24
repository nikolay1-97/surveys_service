import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOptionDto {
  
  @ApiProperty()
  @IsString()
  readonly title: string;

}
