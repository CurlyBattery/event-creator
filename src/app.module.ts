import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';

import { LoggerModule } from '@common/logger/logger.module';
import { FiltersModule } from '@common/filters/filters.module';
import { ExceptionsModule } from '@common/exceptions/exceptions.module';
import { InterceptorsModule } from '@common/interceptors/interceptors.module';
import { PrismaModule } from '@common/database/prisma.module';
import { ConfigModule } from '@common/config/config.module';
import { UserModule } from '@user/user.module';

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
];

// Infrastructure Modules(DB, config) used by the server
const infrastructureModules: NestModuleImport[] = [PrismaModule, ConfigModule];

@Module({
  imports: [...appModules, ...infrastructureModules],
})
export class AppModule {}
