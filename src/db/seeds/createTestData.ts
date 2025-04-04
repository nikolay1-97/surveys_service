import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE "answers_options", "answers", "survey_results", "options", "questions", "surveys", "admins", "users"  RESTART IDENTITY');
  
  

  // Inserts seed entries
  await knex('admins').insert([
    {
      email: 'admin1@mail.ru',
      password: await bcrypt.hash('qwerty', 10),
    },
  ]);
  await knex('admins').insert([
    {
      email: 'admin2@mail.ru',
      password: await bcrypt.hash('qwerty', 10),
    },
  ]);
  await knex('users').insert([
    {
      email: 'user1@mail.ru',
      password: await bcrypt.hash('qwerty', 10),
    },
  ]);
  await knex('surveys').insert([
    {
      owner_id: 1,
      title: 'survey1',
    },
  ]);
  await knex('surveys').insert([
    {
      owner_id: 2,
      title: 'survey2',
    },
  ]);
  await knex('surveys').insert([
    {
      owner_id: 1,
      title: 'survey3',
    },
  ]);
  await knex('surveys').insert([
    {
      owner_id: 1,
      title: 'survey4',
    },
  ]);
  await knex('questions').insert([
    {
      survey_id: 1,
      question: 'question1',
      type: 'single choice'
    },
  ]);
  await knex('questions').insert([
    {
      survey_id: 1,
      question: 'question2',
      type: 'multiple choice'
    },
  ]);
  await knex('questions').insert([
    {
      survey_id: 1,
      question: 'question3',
      type: 'text'
    },
  ]);
  await knex('questions').insert([
    {
      survey_id: 2,
      question: 'question1',
      type: 'single choice'
    },
  ]);
  await knex('questions').insert([
    {
      survey_id: 2,
      question: 'question2',
      type: 'multiple choice'
    },
  ]);
  await knex('questions').insert([
    {
      survey_id: 2,
      question: 'question3',
      type: 'text'
    },
  ]);
  await knex('questions').insert([
    {
      survey_id: 3,
      question: 'question1',
      type: 'single choice'
    },
  ]);
  await knex('questions').insert([
    {
      survey_id: 3,
      question: 'question2',
      type: 'multiple choice'
    },
  ]);
  await knex('questions').insert([
    {
      survey_id: 3,
      question: 'question3',
      type: 'text'
    },
  ]);
  await knex('questions').insert([
    {
      survey_id: 4,
      question: 'question1',
      type: 'single choice'
    },
  ]);
  await knex('questions').insert([
    {
      survey_id: 4,
      question: 'question2',
      type: 'multiple choice'
    },
  ]);
  await knex('questions').insert([
    {
      survey_id: 4,
      question: 'question3',
      type: 'text'
    },
  ]);
  await knex('options').insert([
    {
      question_id: 1,
      title: 'option1',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 2,
      title: 'option1',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 2,
      title: 'option2',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 3,
      title: 'option1',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 4,
      title: 'option1',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 5,
      title: 'option1',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 5,
      title: 'option2',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 6,
      title: 'option1',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 7,
      title: 'option1',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 8,
      title: 'option1',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 8,
      title: 'option2',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 9,
      title: 'option1',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 10,
      title: 'option1',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 11,
      title: 'option1',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 11,
      title: 'option2',
    },
  ]);
  await knex('options').insert([
    {
      question_id: 12,
      title: 'option1',
    },
  ]);
  await knex('survey_results').insert([
    {
      user_id: 1,
      survey_id: 1,
    },
  ]);
  await knex('answers').insert([
    {
      user_id: 1,
      survey_results_id: 1,
      question_id: 1,
    },
  ]);
  await knex('answers').insert([
    {
      user_id: 1,
      survey_results_id: 1,
      question_id: 2,
    },
  ]);
  await knex('answers').insert([
    {
      user_id: 1,
      survey_results_id: 1,
      question_id: 3,
      answer: 'Это ответ на вопрос типа текст'
    },
  ]);
  await knex('answers_options').insert([
    {
      answer_id: 1,
      option_id: 1,
    },
  ]);
  await knex('answers_options').insert([
    {
      answer_id: 2,
      option_id: 2,
    },
  ]);
  await knex('answers_options').insert([
    {
      answer_id: 2,
      option_id: 3,
    },
  ]);
  await knex('answers_options').insert([
    {
      answer_id: 3,
      option_id: 4,
    },
  ]);

  
  
}
