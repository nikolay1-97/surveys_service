import { BaseModel } from '../baseModel';

export class Answers extends BaseModel {
  static tableName = 'answers';

  survey_results_id: number;
  question_id: number;
  created_at: string;
}
