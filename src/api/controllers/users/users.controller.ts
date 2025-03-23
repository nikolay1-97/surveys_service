import {
    Controller,
    Post,
    Body,
    UseGuards,
  } from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';
import { CreateUserDto } from 'src/api/dto/users/userCreate.dto';
import { CreateUserResponseDto } from 'src/api/dtoResponse/user/userCreateResponse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

  
  @Controller('users')
  export class UsersController {
    constructor(
      private readonly userService: UsersService,
    ) {}
  
    @ApiTags('User')
    @ApiResponse({ status: 201, type: CreateUserResponseDto })
    @Post('register')
    async register(@Body() dto: CreateUserDto): Promise<CreateUserResponseDto> {
      await this.userService.create({
        email: dto.email,
        password: dto.password,
      });
      return new CreateUserResponseDto({ email: dto.email });
    }

}
  