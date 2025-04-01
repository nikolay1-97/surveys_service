import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from 'src/db/repositories/users/repository';
import { CreateUserDto } from 'src/api/dto/users/userCreate.dto';
import { CreateUserResponseDto } from 'src/api/dtoResponse/user/userCreateResponse.dto';
import { PasswordService } from 'src/feature-md/password/password.service';
import { Users } from 'src/db/models/users/users';


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
      const trx = await Users.startTransaction()
      try {
        await this.userRepository.create(data, trx);
        await trx.commit()
        return new CreateUserResponseDto({ email: dto.email });
      } catch(e) {
        console.log(e)
        await trx.rollback()
        throw e
      }
    }
    throw new BadRequestException('user already exists');
  }

}
