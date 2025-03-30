import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from 'src/db/repositories/users/repository';
import { CreateUserDto } from 'src/api/dto/users/userCreate.dto';
import { CreateUserResponseDto } from 'src/api/dtoResponse/user/userCreateResponse.dto';
import { PasswordService } from 'src/feature-md/password/password.service';


@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async create(dto: CreateUserDto): Promise<CreateUserResponseDto> {
    const user = await this.userRepository.getByEmail(
      dto.email,
    );
    if (!user) {
      const data = {
        email: dto.email,
        password: await this.passwordService.getPasswordHash(dto.password),
      }
      await this.userRepository.create(data);
      return new CreateUserResponseDto({ email: dto.email });
    }
    throw new BadRequestException('user already exists');
  }

}
