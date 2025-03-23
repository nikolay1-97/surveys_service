import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CreateUserDto } from 'src/api/dto/users/userCreate.dto';
import { PasswordService } from 'src/feature-md/password/password.service';
import { User } from 'src/db/models/users/users';


@Injectable()
export class UsersRepository {
  constructor(
    @Inject('User') private modelClass: ModelClass<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async getById(id: number) {
    try {
      const user: User | undefined = await this.modelClass.query().findById(id);

      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByEmail(email: string) {
    try {
      const user: User[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('email', '=', email);

      return user[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(dto: CreateUserDto) {
    try {
      const data: object = {
        email: dto.email,
        password: await this.passwordService.getPasswordHash(
          dto.password,
        ),
      };
      await this.modelClass.query().insert(data);
      return dto;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}
