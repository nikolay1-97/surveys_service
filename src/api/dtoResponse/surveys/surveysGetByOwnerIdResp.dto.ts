import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';


export class GetByOwnerIdSurveysResponseDto {

  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @Exclude()
  owner_id: number;


  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly created_at: string;

  constructor(partial: Partial<GetByOwnerIdSurveysResponseDto>) {
    Object.assign(this, partial);
  }
}
