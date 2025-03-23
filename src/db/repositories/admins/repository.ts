import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { Admin } from 'src/db/models/admins/admins';


@Injectable()
export class AdminsRepository {
  constructor(
    @Inject('Admin') private modelClass: ModelClass<Admin>,
  ) {}

  async getByEmail(email: string) {
    try {
      const admins: Admin[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('email', '=', email);

      return admins[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }


}
