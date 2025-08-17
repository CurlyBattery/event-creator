import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Event Creator API')
  .setDescription('Authentication users')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
