import { BaseModel } from '../baseModel';

export class SurveyResults extends BaseModel {
  static tableName = 'survey_results';

  user_id: number;
  survey_id: number;
  title: string;
  created_at: string;
}
