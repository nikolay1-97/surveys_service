import { BaseModel } from '../baseModel';

export class Questions extends BaseModel {
  static tableName = 'questions';

  survey_id: number;
  question: string;
  type: string;
  created_at: string;
}
