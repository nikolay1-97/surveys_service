import { BaseModel } from '../baseModel';

export class Users extends BaseModel {
  static tableName = 'users';

  email: string;
  password: string;
  created_at: string;
}
