import { Module } from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';
import { UsersRepository } from 'src/db/repositories/user/repository';
import { UsersController } from 'src/api/controllers/users/users.controller';
import { User } from 'src/db/models/users/users';
import { PasswordService } from 'src/feature-md/password/password.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    User,
    PasswordService,
  ],
})
export class UsersModule {}
