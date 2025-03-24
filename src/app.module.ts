import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { FeatureMdModule } from './feature-md/feature-md.module';
import { UsersModule } from './modules/users/users.module';
import { SurveysModule } from './modules/surveys/surveys.module';
import { AdminsModule } from './modules/admins/admins.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { OptionsModule } from './modules/options/options.module';
import { SurveyResultsModule } from './modules/survey_results/survey_results.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    DatabaseModule,
    FeatureMdModule,
    AdminsModule,
    UsersModule,
    SurveysModule,
    QuestionsModule,
    OptionsModule,
    SurveyResultsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
