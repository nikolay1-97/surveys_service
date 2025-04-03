import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { AnswersOptions } from 'src/db/models/answersOptions/answersOptions';
import { CreateAnswersOptionsType } from 'src/db/types/answersOptions/answersOptionsType'; 

@Injectable()
export class AnswersOptionsRepository {
  constructor(
    @Inject('AnswersOptions') private modelClass: ModelClass<AnswersOptions>,
  ) {}

  async create(data: Array<CreateAnswersOptionsType>, trx) {
    try {
      await this.modelClass.query(trx).insert(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getBySurveyAnswerIdAndOptionId(answer_id: number, option_id: number) {
        try {
          const items: AnswersOptions[] | undefined = await this.modelClass
            .query()
            .select('*')
            .where('answer_id', '=', answer_id)
            .where('option_id', '=', option_id);
    
          return items[0];
        } catch (e) {
          console.log(e);
          throw e;
        }
    }

    async getStatBySurveyId(
        survey_id: number,
      ) {
        try {
          const surveyStat: AnswersOptions[] | undefined = await this.modelClass
            .query()
            .where('survey_results.survey_id', '=', survey_id)
            .join('options', 'options.id', '=', 'answers_options.option_id')
            .join('questions', 'questions.id', '=', 'options.question_id')
            .join('answers', 'questions.id', '=', 'answers.question_id')
            .join('survey_results', 'survey_results.id', '=', 'answers.survey_results_id')
            .join('users', 'users.id', '=', 'survey_results.user_id')
            .select(
                'users.email',
                'questions.question',
                'answers.answer',
                'options.title as option',
                'type',
            );
          if (surveyStat.length === 0) {
            return [];
          }
          const res = {}
          for (let cnt=0; cnt<=surveyStat.length-1;cnt++) {
            let email = surveyStat[cnt]['email']
            let question = surveyStat[cnt]['question']
            let answer = surveyStat[cnt]['answer']
            let option = surveyStat[cnt]['option']
            let type = surveyStat[cnt]['type']
            
            if (email in res) {
                if (question in res[email]['questions']) {
                    res[email]['questions'][question]['options'].push(option)
                }
                else {
                    res[email]['questions'][question] = {'options': []}
                    res[email]['questions'][question]['options'].push(option)
                    res[email]['questions'][question]['answer'] = answer
                    res[email]['questions'][question]['type'] = type
                }
            }
            else {
                res[email] = {}
                res[email]['questions'] = {}
                res[email]['questions'][question] = {'options': []}
                res[email]['questions'][question]['options'].push(option)
                res[email]['questions'][question]['answer'] = answer
                res[email]['questions'][question]['type'] = type
            }
          }

          return res;
        } catch (e) {
          console.log(e);
          throw e;
        }
    }

    async getStat() {
      try {
        const surveyStat: AnswersOptions[] | undefined = await this.modelClass
          .query()
          .join('options', 'options.id', '=', 'answers_options.option_id')
          .join('questions', 'questions.id', '=', 'options.question_id')
          .join('answers', 'questions.id', '=', 'answers.question_id')
          .join('users', 'users.id', '=', 'answers.user_id')
          .join('survey_results', 'users.id', '=', 'survey_results.user_id')
          .join('surveys', 'surveys.id', '=', 'survey_results.survey_id')
          .select(
              'users.email',
              'surveys.title as survey',
              'questions.question',
              'answers.answer',
              'options.title as option',
              'type',
          );
        if (surveyStat.length === 0) {
          return [];
        }
        const res = {}
        for (let cnt=0; cnt<=surveyStat.length-1;cnt++) {
          let survey = surveyStat[cnt]['survey']
          let email = surveyStat[cnt]['email']
          let question = surveyStat[cnt]['question']
          let answer = surveyStat[cnt]['answer']
          let option = surveyStat[cnt]['option']
          let type = surveyStat[cnt]['type']
          
          if (email in res) {
              if (survey in res[email]['surveys']) {
                if (question in res[email]['surveys'][survey]['questions'])
                  res[email]['surveys'][survey]['questions'][question]['options'].push(option)
                else {
                  res[email]['surveys'][survey]['questions'][question] = {'options': [], 'answer': answer, 'type': type}
                  res[email]['surveys'][survey]['questions'][question]['options'].push(option)
                }
              }
              else {
                res[email]['surveys'][survey] = {'questions': {}}
                res[email]['surveys'][survey]['questions'][question] = {'options': [], 'answer': answer, 'type': type}
                res[email]['surveys'][survey]['questions'][question]['options'].push(option)
              }
          }
          else {
              res[email] = {'surveys': {}}
              res[email]['surveys'][survey] = {'questions': {}}
              res[email]['surveys'][survey]['questions'][question] = {'options': [], 'answer': answer, 'type': type}
              res[email]['surveys'][survey]['questions'][question]['options'].push(option)
              
              
          }
        }

        return res;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
}
