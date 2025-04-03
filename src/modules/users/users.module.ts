import { Module } from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';
import { UsersAuthService } from 'src/service/users/usersAuth.service';
import { UsersRepository } from 'src/db/repositories/users/repository';
import { UsersController } from 'src/api/controllers/users/users.controller';
import { Users } from 'src/db/models/users/users';
import { PasswordService } from 'src/feature-md/password/password.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersAuthService,
    UsersRepository,
    Users,
    PasswordService,
    JwtService,
  ],
})
export class UsersModule {}
