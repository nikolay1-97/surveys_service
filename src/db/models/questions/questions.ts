import { BaseModel } from '../baseModel';

export class Question extends BaseModel {
  static tableName = 'questions';

  survey_id: number;
  question: string;
  type: string;
  created_at: string;
}
