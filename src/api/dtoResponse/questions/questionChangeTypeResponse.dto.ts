import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class ChangeTypeQuestionResponseDto {

  @ApiProperty()
  @IsString()
  readonly type: string;

  constructor(partial: Partial<ChangeTypeQuestionResponseDto>) {
    Object.assign(this, partial);
  }
}
