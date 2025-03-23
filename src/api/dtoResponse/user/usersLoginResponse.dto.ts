import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUsersResponseDto {
  @ApiProperty()
  @IsString()
  readonly access_token: string;

  constructor(partial: Partial<LoginUsersResponseDto>) {
    Object.assign(this, partial);
  }
}
