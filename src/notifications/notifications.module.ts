import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RealNotificationsService } from '@notifications/infra/adapters/real-notifications.service';
import { NotificationsService } from '@notifications/infra/ports/notifications.service';
import { SendVerificationCodeEmailHandler } from '@notifications/application/commands/send-code.command';

const CommandHandlers = [SendVerificationCodeEmailHandler];

@Global()
@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: NotificationsService,
      useClass: RealNotificationsService,
    },
    ...CommandHandlers,
  ],
})
export class NotificationsModule {}
