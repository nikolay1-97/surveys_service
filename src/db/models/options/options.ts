import { BaseModel } from '../baseModel';

export class Options extends BaseModel {
  static tableName = 'options';

  question_id: number;
  title: string;
  created_at: string;
}
