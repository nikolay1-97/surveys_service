// Update with your config settings.

import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import conf from '../configuration/index';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:1234@localhost/pw_task3',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
    ...knexSnakeCaseMappers(),
  },
} as Knex.Config;
