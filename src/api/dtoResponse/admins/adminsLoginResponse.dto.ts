import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminsResponseDto {
  @ApiProperty()
  @IsString()
  readonly access_token: string;

  constructor(partial: Partial<LoginAdminsResponseDto>) {
    Object.assign(this, partial);
  }
}
