import { Module } from '@nestjs/common';

import { LoggerService } from '@common/logger/infra/persistence/logger.service';
import { AbstractLogger } from '@common/logger/domain/logger';

@Module({
  providers: [
    {
      provide: AbstractLogger,
      useClass: LoggerService,
    },
  ],
  exports: [AbstractLogger],
})
export class LoggerModule {}
