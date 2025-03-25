import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateAnswersDto {
  @ApiProperty()
  @IsString()
  readonly answer: string;

}
