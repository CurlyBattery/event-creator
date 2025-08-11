import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@common/database/infra/persistence/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
