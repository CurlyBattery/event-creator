import { Module } from '@nestjs/common';
import { ExceptionsService } from '@common/exceptions/infra/persistence/exceptions.service';
import { AbstractException } from '@common/exceptions/domain/exception';

@Module({
  providers: [
    {
      provide: AbstractException,
      useClass: ExceptionsService,
    },
  ],
  exports: [AbstractException],
})
export class ExceptionsModule {}
