import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@common/interceptors/infra/inerceptors/response.interceptor';
import { LoggingInterceptor } from '@common/interceptors/infra/inerceptors/logging.interceptor';
import { LoggerModule } from '@common/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class InterceptorsModule {}
