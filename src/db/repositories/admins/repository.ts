import { Injectable, Inject, Logger } from '@nestjs/common';
import { ModelClass } from 'objection';
import { Admins } from 'src/db/models/admins/admins';

@Injectable()
export class AdminsRepository {
  constructor(
    @Inject('Admins') private modelClass: ModelClass<Admins>,
    private readonly logger = new Logger(AdminsRepository.name),
  ) {}

  async getByEmail(email: string) {
    try {
      const admins: Admins[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('email', '=', email);

      return admins[0];
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
