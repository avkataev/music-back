import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './common/middlewares/logger.middleware';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './utils/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalInterceptors(new ResponseInterceptor());
  //app.useGlobalFilters(new AllExceptionsFilter());
  setupSwagger(app);
  app.setGlobalPrefix('/api');
  app.enableCors();
  app.use(logger);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
