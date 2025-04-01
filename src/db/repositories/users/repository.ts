import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { Users } from 'src/db/models/users/users';


@Injectable()
export class UsersRepository {
  constructor(
    @Inject('Users') private modelClass: ModelClass<Users>,
  ) {}

  async getById(id: number) {
    try {
      const user: Users | undefined = await this.modelClass.query().findById(id);

      return user;
    } catch (e) {
      console.log(e);
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
      console.log(e);
      throw e;
    }
  }

  async create(data: object, trx) {
    try {
      return await this.modelClass.query(trx).insert(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}
