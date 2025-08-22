import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RealNotificationsService } from '@notifications/infra/adapters/real-notifications.service';
import { NotificationsService } from '@notifications/infra/ports/notifications.service';

@Global()
@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: NotificationsService,
      useClass: RealNotificationsService,
    },
  ],
})
export class NotificationsModule {}
