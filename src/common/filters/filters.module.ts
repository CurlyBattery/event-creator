import { Module } from '@nestjs/common';
import { LoggerModule } from '@common/logger/logger.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from '@common/filters/infra/persistence/all-exception.filter';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class FiltersModule {}
