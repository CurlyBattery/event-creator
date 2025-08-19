import { EventM } from '@event/domain/model/event';
import { QueryPaginationDto } from '@common/dtos/query-pagination.dto';
import { PaginateOutput } from '@common/utils/pagination.util';

export abstract class EventService {
  abstract create(event: EventM): Promise<EventM>;
  abstract findAll(query?: QueryPaginationDto): Promise<PaginateOutput<EventM>>;
  abstract findOne(id: string): Promise<EventM>;
  abstract update(id: string, event: Partial<EventM>): Promise<EventM>;
  abstract delete(id: string): Promise<EventM>;
}
