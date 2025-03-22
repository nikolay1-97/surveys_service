import { BaseModel } from '../baseModel';

export class Survey extends BaseModel {
  static tableName = 'surveys';

  owner_id: number;
  title: string;
  created_at: string;
}
