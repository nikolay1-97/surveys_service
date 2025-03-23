import { Module } from '@nestjs/common';
import { AdminsAuthService } from 'src/service/admins/adminsAuth.service';
import { AdminsRepository } from 'src/db/repositories/admins/repository';
import { AdminsController } from 'src/api/controllers/admins/admins.controller';
import { Admin } from 'src/db/models/admins/admins';
import { PasswordService } from 'src/feature-md/password/password.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AdminsController],
  providers: [
    AdminsAuthService,
    AdminsRepository,
    Admin,
    PasswordService,
    JwtService,
  ],
})
export class AdminsModule {}
