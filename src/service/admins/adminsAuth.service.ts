import { Injectable } from '@nestjs/common';
import { AdminsRepository } from 'src/db/repositories/admins/repository';
import { PasswordService } from 'src/feature-md/password/password.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminsAuthService {
  constructor(
    private readonly adminRepository: AdminsRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async validateUser(email: string, password: string) {
    const admin = await this.adminRepository.getByEmail(email);
    if (admin) {
      const isValid = await this.passwordService.verify_password(
        password,
        admin.password,
      );
      if (!isValid) {
        return false;
      }
      return admin;
    }
    return false;
  }

  async login(email: string, password: string) {
    const admin = await this.validateUser(email, password);
    if (admin) {
      const payload = {
        id: admin.id,
        email: admin.email,
      };

      const token: string = await this.jwtService.signAsync(payload, {
        secret: this.configService.get('ADMIN_SECRET'),
        expiresIn: this.configService.get('EXPIRE_JWT'),
      });
      return { access_token: token };
    }
    return false;
  }
}
