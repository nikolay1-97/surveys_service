import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const config = new DocumentBuilder()
    .setTitle('Сервис онлайн опросов')
    .setDescription('сервис онлайн опросов')
    .setVersion('1.0')
    .addTag('Admins/Auth')
    .addTag('Admins/AnswersOptions')
    .addTag('Admins/Surveys')
    .addTag('Users')
    .addTag('Users/Surveys')
    .addTag('Users/Answers')
    .addTag('Users/SurveyResults')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? port);
}
bootstrap();
