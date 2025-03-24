import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeTypeQuestionDto {

  @ApiProperty()
  @IsString()
  readonly type: string;

}
