import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors({
    origin: [configService.get<string>('FRONTEND_URL')],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
