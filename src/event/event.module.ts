import { Module } from '@nestjs/common';

import { EventController } from '@event/infra/controllers/event.controller';
import { EventRepository } from '@event/infra/ports/event.repository';
import { EventService } from '@event/infra/ports/event.service';
import { RealEventService } from '@event/infra/adapters/real-event.service';
import { RealEventRepository } from '@event/infra/adapters/real-event.repository';
import { SubscriptionRepository } from '@event/infra/ports/subscription.repository';
import { RealSubscriptionRepository } from '@event/infra/adapters/real-subcription.repository';
import { SubscriptionService } from '@event/infra/ports/subscription.service';
import { RealSubscriptionService } from '@event/infra/adapters/real-subscription.service';
import { ExceptionsModule } from '@common/exceptions/exceptions.module';

@Module({
  imports: [ExceptionsModule],
  controllers: [EventController],
  providers: [
    {
      provide: EventRepository,
      useClass: RealEventRepository,
    },
    {
      provide: SubscriptionRepository,
      useClass: RealSubscriptionRepository,
    },
    {
      provide: EventService,
      useClass: RealEventService,
    },
    {
      provide: SubscriptionService,
      useClass: RealSubscriptionService,
    },
  ],
})
export class EventModule {}
