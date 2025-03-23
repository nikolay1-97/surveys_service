import { Model } from "objection";

export class AnswersOptions extends Model {
  static tableName = 'answers_options';

  static get idColumn() {
    return 'answer_id';
  }

  answer_id: number;
  option_id: number;
}
