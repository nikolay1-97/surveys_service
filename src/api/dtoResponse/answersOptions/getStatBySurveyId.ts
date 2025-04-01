import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Question {
    @ApiProperty()
    readonly options: [string];
  
    @ApiProperty()
    readonly answer: string;

    @ApiProperty()
    readonly type: string;
}

export class Quest {
    @ApiProperty({ type: () => Question })
    readonly question: Question;
  
  }

export class Questions {
  @ApiProperty({ type: () => Quest })
  readonly questions: Quest;

}

export class GetStatBySurveyIdResponseDto {

  @ApiProperty({ type: () => Questions })
  readonly email: Questions;
}
