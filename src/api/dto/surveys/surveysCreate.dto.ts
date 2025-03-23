import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateSurveysDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

}
