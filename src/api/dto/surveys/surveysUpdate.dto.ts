import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateSurveysDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

}
