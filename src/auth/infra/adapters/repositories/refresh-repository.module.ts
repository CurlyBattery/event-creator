import { Module } from '@nestjs/common';

import { RealRefreshRepository } from '@auth/infra/adapters/repositories/real-refresh.repository';
import { RefreshRepository } from '@auth/infra/ports/refresh.repository';

@Module({
  providers: [
    {
      provide: RefreshRepository,
      useClass: RealRefreshRepository,
    },
  ],
  exports: [RefreshRepository],
})
export class RefreshRepositoryModule {}
