import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { LoggerModule } from '@common/logger/logger.module';
import { FiltersModule } from '@common/filters/filters.module';
import { ExceptionsModule } from '@common/exceptions/exceptions.module';
import { InterceptorsModule } from '@common/interceptors/interceptors.module';
import { PrismaModule } from '@common/database/prisma.module';
import { ConfigModule as MyConfigModule } from '@common/config/config.module';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { EventModule } from '@event/event.module';
import { NotificationsModule } from '@notifications/notifications.module';

type NestModuleImport =
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<any>;

// SubModule used by server
const appModules: NestModuleImport[] = [
  LoggerModule,
  FiltersModule,
  ExceptionsModule,
  InterceptorsModule,
  UserModule,
  AuthModule,
  EventModule,
  NotificationsModule,
];

// Infrastructure Modules(DB, config) used by the server
const infrastructureModules: NestModuleImport[] = [
  PrismaModule,
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    validationSchema: Joi.object({
      JWT_SECRET: Joi.string().required(),
      EXPIRES_IN: Joi.string().required(),
      AGE_REFRESH: Joi.string().required(),
      FRONTEND_URL: Joi.string().required(),
      EXPIRES_OTP: Joi.string().required(),
      EMAIL_SERVICE: Joi.string().required(),
      EMAIL_USER: Joi.string().required(),
      EMAIL_PASSWORD: Joi.string().required(),
    }),
  }),
  MyConfigModule,
];

@Module({
  imports: [...appModules, ...infrastructureModules],
})
export class AppModule {}
