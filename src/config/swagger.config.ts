import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Music API')
    .setDescription('API v1')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
}
