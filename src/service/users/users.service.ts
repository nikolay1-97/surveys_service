import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from 'src/db/repositories/users/repository';
import { CreateUserDto } from 'src/api/dto/users/userCreate.dto';
import { CreateUserResponseDto } from 'src/api/dtoResponse/user/userCreateResponse.dto';


@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<CreateUserResponseDto> {
    const user = await this.userRepository.getByEmail(
      dto.email,
    );
    if (!user) {
      await this.userRepository.create(dto);
      return new CreateUserResponseDto({ email: dto.email });
    }
    throw new BadRequestException('user already exists');
  }

}
