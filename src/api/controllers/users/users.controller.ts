import {
    Controller,
    Post,
    Body,
    UseGuards,
    BadRequestException,
  } from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';
import { UsersAuthService } from 'src/service/users/usersAuth.service';
import { CreateUserDto } from 'src/api/dto/users/userCreate.dto';
import { CreateUserResponseDto } from 'src/api/dtoResponse/user/userCreateResponse.dto';
import { LoginUsersDto } from 'src/api/dto/users/usersLogin.dto';
import { LoginUsersResponseDto } from 'src/api/dtoResponse/user/usersLoginResponse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

  
  @ApiTags('Users')
  @Controller('users')
  export class UsersController {
    constructor(
      private readonly userService: UsersService,
      private readonly usersAuthService: UsersAuthService,
    ) {}
  
    @ApiTags('User')
    @ApiResponse({ status: 201, type: CreateUserResponseDto })
    @Post()
    async register(@Body() dto: CreateUserDto): Promise<CreateUserResponseDto> {
      await this.userService.create({
        email: dto.email,
        password: dto.password,
      });
      return new CreateUserResponseDto({ email: dto.email });
    }

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
  