import { BaseModel } from '../baseModel';

export class Admin extends BaseModel {
  static tableName = 'admins';

  email: string;
  password: string;
  created_at: string;
}
