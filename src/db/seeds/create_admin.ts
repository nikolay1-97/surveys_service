import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE "admins" RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('admins').insert([
    {
      email: 'admin1@mail.ru',
      password: await bcrypt.hash('qwerty', 10),
    },
  ]);
}
