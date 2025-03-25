import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { AnswersOptions } from 'src/db/models/answersOptions/answersOptions'; 

@Injectable()
export class AnswersOptionsRepository {
  constructor(
    @Inject('AnswersOptions') private modelClass: ModelClass<AnswersOptions>,
  ) {}

  async create(answer_id: number, option_id: number) {
    try {
      const data: object = {
        answer_id: answer_id,
        option_id: option_id,
      };
      await this.modelClass.query().insert(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getBySurveyAnswerIdAndOptionId(answer_id: number, option_id: number) {
        try {
          const answerOption: AnswersOptions[] | undefined = await this.modelClass
            .query()
            .select('*')
            .where('answer_id', '=', answer_id)
            .where('option_id', '=', option_id);
    
          return answerOption[0];
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
                'options.title'
            );
          let res = {}
          for (let cnt=0; cnt<=surveyStat.length-1;cnt++) {
            if (surveyStat[cnt]['email'] in res) {
                if (surveyStat[cnt]['question'] in res[surveyStat[cnt]['email']]) {
                    res[surveyStat[cnt]['email']][surveyStat[cnt]['question']].push(surveyStat[cnt]['title'])
                    res[surveyStat[cnt]['email']][surveyStat[cnt]['question']].push(surveyStat[cnt]['answer'])
                }
                else {
                    res[surveyStat[cnt]['email']][surveyStat[cnt]['question']] = []
                    res[surveyStat[cnt]['email']][surveyStat[cnt]['question']].push(surveyStat[cnt]['title'])
                    res[surveyStat[cnt]['email']][surveyStat[cnt]['question']].push(surveyStat[cnt]['answer'])
                }
            }
            else {
                res[surveyStat[cnt]['email']] = {}
                res[surveyStat[cnt]['email']][surveyStat[cnt]['question']] = []
                res[surveyStat[cnt]['email']][surveyStat[cnt]['question']].push(surveyStat[cnt]['title'])
                res[surveyStat[cnt]['email']][surveyStat[cnt]['question']].push(surveyStat[cnt]['answer'])
            }
          }
          console.log(res)
    
          return surveyStat;
        } catch (e) {
          console.log(e);
          throw e;
        }
    }

}
