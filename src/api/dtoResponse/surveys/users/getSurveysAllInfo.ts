import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Option {
    @ApiProperty()
    @IsString()
    readonly title: string;
}


export class Options {
    @ApiProperty({ type: () => Option })
    readonly id: Option;
}


export class Question {
    @ApiProperty()
    @IsString()
    readonly question: string;
    
    @ApiProperty({ type: () => Options })
    readonly options: Options;
}


export class Questions {
    @ApiProperty({ type: () => Question })
    readonly id: Question;
  }


export class Survey {
  @ApiProperty()
  @IsString()
  readonly title: string; 

  @ApiProperty({ type: () => Questions })
  readonly questions: Questions;
}


export class GetSurveysAllInfoResponseDto {
  @ApiProperty({ type: () => Survey})
  readonly id: Survey;
}
