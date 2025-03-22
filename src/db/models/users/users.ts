import { BaseModel } from '../baseModel';

export class User extends BaseModel {
  static tableName = 'users';

  email: string;
  password: string;
  created_at: string;
}
