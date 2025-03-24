import {
    Controller,
    Post,
    Body,
    UseGuards,
    BadRequestException,
  } from '@nestjs/common';
import { UsersAuthService } from 'src/service/users/usersAuth.service';
import { LoginUsersDto } from 'src/api/dto/users/usersLogin.dto';
import { LoginUsersResponseDto } from 'src/api/dtoResponse/user/usersLoginResponse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

  
  @ApiTags('Users')
  @Controller('user')
  export class UsersAuthController {
    constructor(
      private readonly usersAuthService: UsersAuthService,
    ) {}
  
    @ApiResponse({ status: 200, type: LoginUsersResponseDto })
      @Post()
      async login(
        @Body() dto: LoginUsersDto,
      ): Promise<LoginUsersResponseDto> {
        const token = await this.usersAuthService.login(
          dto.email,
          dto.password,
        );
        if (token) {
          return new LoginUsersResponseDto({
            access_token: token.access_token,
          });
        }
        throw new BadRequestException('неверный логин или пароль');
      }

}
  