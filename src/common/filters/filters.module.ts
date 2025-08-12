import { Module, Scope } from '@nestjs/common';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';

import { AllExceptionFilter } from '@common/filters/all/infra/persistence/all-exception.filter';
import { PrismaExceptionFilter } from '@common/filters/prisma/infra/persistence/prisma-exception.filter';
import { LoggerModule } from '@common/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
      scope: Scope.REQUEST,
    },
    {
      provide: APP_FILTER,
      useFactory: (httpAdapterHost: HttpAdapterHost) => {
        return new PrismaExceptionFilter(httpAdapterHost.httpAdapter);
      },
      inject: [HttpAdapterHost],
    },
  ],
})
export class FiltersModule {}
