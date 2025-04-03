import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  
  @ApiProperty()
  @IsString()
  readonly question: string;

  @ApiProperty()
  @IsString()
  readonly type: string;

}
