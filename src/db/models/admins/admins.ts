import { BaseModel } from '../baseModel';

export class Admin extends BaseModel {
  static tableName = 'admin';

  email: string;
  password: string;
  created_at: string;
}
