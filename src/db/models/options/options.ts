import { BaseModel } from '../baseModel';

export class Option extends BaseModel {
  static tableName = 'options';

  question_id: number;
  title: string;
  created_at: string;
}
