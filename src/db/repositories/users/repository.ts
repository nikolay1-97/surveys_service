import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { User } from 'src/db/models/users/users';


@Injectable()
export class UsersRepository {
  constructor(
    @Inject('User') private modelClass: ModelClass<User>,
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

  async create(data: object) {
    try {
      return await this.modelClass.query().insert(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}
