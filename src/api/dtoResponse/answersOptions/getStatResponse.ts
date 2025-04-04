import { IsString, IsNumber } from 'class-validator';
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

export class Questions {
  @ApiProperty({ type: () => Question })
  readonly question: Question;
}

export class Survey {
  @ApiProperty({ type: () => Questions })
  readonly title: Questions;
}

export class Surveys {
  @ApiProperty({ type: () => Survey })
  readonly surveys: Survey;
}

export class GetStatResponseDto {
  @IsNumber()
  @ApiProperty()
  readonly count: number;

  @ApiProperty({ type: () => Surveys })
  readonly email: Surveys;
}
