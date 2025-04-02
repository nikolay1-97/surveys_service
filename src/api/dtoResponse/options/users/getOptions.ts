import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';


export class GetOptionsResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;
  
  @ApiProperty()
  @IsNumber()
  readonly option_id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @Exclude()
  readonly created_at: string;

  constructor(partial: Partial<GetOptionsResponseDto>) {
    Object.assign(this, partial);
  }
}
