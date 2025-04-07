import { Injectable, Inject, Logger } from '@nestjs/common';
import { ModelClass } from 'objection';
import { Users } from 'src/db/models/users/users';
import { CreateUsersType } from 'src/db/types/users/createUsersType';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('Users') private modelClass: ModelClass<Users>,
    private readonly logger = new Logger(UsersRepository.name),
  ) {}

  async getById(id: number) {
    try {
      const user: Users | undefined = await this.modelClass
        .query()
        .findById(id);

      return user;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async getByEmail(email: string) {
    try {
      const user: Users[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('email', '=', email);

      return user[0];
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async create(data: CreateUsersType, trx) {
    try {
      return await this.modelClass.query(trx).insert(data);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
