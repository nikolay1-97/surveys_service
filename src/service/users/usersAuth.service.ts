import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/db/repositories/users/repository';
import { PasswordService } from 'src/feature-md/password/password.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersAuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.getByEmail(email);
    if (user) {
      const isValid = await this.passwordService.verify_password(
        password,
        user.password,
      );
      if (!isValid) {
        return false;
      }
      return user;
    }
    return false;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (user) {
      const payload: { sub: number; username: string } = {
        sub: user.id,
        username: user.email,
      };

      const token: string = await this.jwtService.signAsync(payload, {
        secret: this.configService.get('USER_SECRET'),
        expiresIn: this.configService.get('EXPIRE_JWT'),
      });
      return { access_token: token };
    }
    return false;
  }
}
