import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateAnswersDto {
  @ApiProperty()
  @IsString()
  readonly answer: string;
  
  @ApiProperty()
  @IsArray()
  readonly options: [number]

}
