import { IsString, IsEmail, MinLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Question {
    @ApiProperty()
    readonly options: [string];
  
    @IsString()
    @ApiProperty()
    readonly answer: string;

    @IsString()
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
  @IsNumber()
  @ApiProperty()
  readonly count: number;

  @ApiProperty({ type: () => Questions })
  readonly email: Questions;
}
