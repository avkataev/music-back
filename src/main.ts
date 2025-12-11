import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './common/middlewares/logger.middleware';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalInterceptors(new ResponseInterceptor());
  //app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('/api');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Music API')
    .setDescription('API v1')
    .setVersion('1.0.0')
    .setContact(
      'Anton Kataev',
      'https://t.me/avkataev',
      'a.v.kataev.it@#yandex.ru',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  app.use(logger);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
