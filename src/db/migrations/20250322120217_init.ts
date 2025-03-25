import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('admins', function (table) {
      table.increments().primary();
      table.string('email').unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('users', function (table) {
        table.increments().primary();
        table.string('email').unique();
        table.string('password').notNullable();
        table.timestamps(true, true);
      })
    .createTable('surveys', function (table) {
      table.increments().primary();
      table.integer('owner_id').notNullable();
      table.string('title').unique();
      table
        .foreign('owner_id')
        .references('id')
        .inTable('admins')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('questions', function (table) {
        table.increments().primary();
        table.integer('survey_id').notNullable();
        table.string('question');
        table.string('type');
        table
          .foreign('survey_id')
          .references('id')
          .inTable('surveys')
          .onDelete('CASCADE');
        table.timestamps(true, true);
      })
      .createTable('survey_results', function (table) {
        table.increments().primary();
        table.integer('user_id').notNullable();
        table.integer('survey_id').notNullable();
        table.string('title');
        table
          .foreign('user_id')
          .references('id')
          .inTable('users')
          .onDelete('CASCADE');
        table
          .foreign('survey_id')
          .references('id')
          .inTable('surveys')
          .onDelete('CASCADE');
        table.timestamps(true, true);
      })
      .createTable('answers', function (table) {
        table.increments().primary();
        table.integer('survey_results_id').notNullable();
        table.integer('question_id').notNullable();
        table.string('answer');
        table
          .foreign('survey_results_id')
          .references('id')
          .inTable('survey_results')
          .onDelete('CASCADE');
        table
          .foreign('question_id')
          .references('id')
          .inTable('questions')
          .onDelete('CASCADE');
        table.timestamps(true, true);
      })
      .createTable('options', function (table) {
        table.increments().primary();
        table.integer('question_id').notNullable();
        table.string('title');
        table
          .foreign('question_id')
          .references('id')
          .inTable('questions')
          .onDelete('CASCADE');
        table.timestamps(true, true);
      })
      .createTable('answers_options', function (table) {
        table.integer('answer_id').notNullable();
        table.integer('option_id').notNullable();
        table
          .foreign('answer_id')
          .references('id')
          .inTable('answers')
          .onDelete('CASCADE');
        table
          .foreign('option_id')
          .references('id')
          .inTable('options')
          .onDelete('CASCADE');
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists('answers_options')
    .dropTableIfExists('options')
    .dropTableIfExists('answer')
    .dropTableIfExists('survey_results')
    .dropTableIfExists('questions')
    .dropTableIfExists('surveys')
    .dropTableIfExists('users')
    .dropTableIfExists('admins')
}

