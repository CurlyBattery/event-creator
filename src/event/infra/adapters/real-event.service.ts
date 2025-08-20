import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EventService } from '@event/infra/ports/event.service';
import { EventM } from '@event/domain/model/event';
import { EventRepository } from '@event/infra/ports/event.repository';
import { AbstractException } from '@common/exceptions/domain/exception';

@Injectable()
export class RealEventService implements EventService {
  constructor(
    @Inject(EventRepository) private readonly eventRepository: EventRepository,
    @Inject(AbstractException)
    private readonly exceptionsService: AbstractException,
  ) {}

  async create(event: EventM): Promise<EventM> {
    const exists = await this.eventRepository.getEventByTitle(event.title);
    if (exists) {
      this.exceptionsService.conflictException({
        message: 'Change The Title',
        codeError: HttpStatus.CONFLICT,
      });
    }

    this.checkDate(event.date);
    this.checkPlaces(event.places);

    const created = await this.eventRepository.insert(event);

    return created;
  }
  findAll(): Promise<EventM[]> {
    return this.eventRepository.getEvents({ isPublished: true });
  }
  async findOne(id: string): Promise<EventM> {
    return await this.getExistsEvent(id);
  }
  async update(id: string, event: Partial<EventM>): Promise<EventM> {
    const eventFromDb = await this.getExistsEvent(id);

    const exists: EventM | null =
      event.title && (await this.eventRepository.getEventByTitle(event.title));

    if (exists && JSON.stringify(eventFromDb) !== JSON.stringify(exists)) {
      this.exceptionsService.conflictException({
        message: 'Change The Title',
        codeError: HttpStatus.CONFLICT,
      });
    }
    if (event.places) this.checkPlaces(event.places);

    return this.eventRepository.updateEvent(id, event);
  }
  async delete(id: string): Promise<EventM> {
    const exists = await this.getExistsEvent(id);

    await this.eventRepository.removeEvent(id);

    return exists;
  }

  async publish(id: string): Promise<EventM> {
    await this.getExistsEvent(id);

    return this.eventRepository.updateEvent(id, { isPublished: true });
  }

  async reschedule(id: string, newDate: Date): Promise<EventM> {
    await this.getExistsEvent(id);

    this.checkDate(newDate);

    return this.eventRepository.updateEvent(id, { date: newDate });
  }

  private checkDate(date: Date) {
    if (new Date(date) < new Date()) {
      this.exceptionsService.badRequestException({
        message: 'Event Date Must Be Greater Than Date Now',
        codeError: HttpStatus.BAD_REQUEST,
      });
    }
  }

  private checkPlaces(places: number) {
    if (places <= 0) {
      this.exceptionsService.badRequestException({
        message: 'Places Than Greater Than 0',
        codeError: HttpStatus.BAD_REQUEST,
      });
    }
  }

  private async getExistsEvent(id: string) {
    const exists = await this.eventRepository.getEventById(id);
    if (!exists) {
      this.exceptionsService.notFoundException({
        message: 'Event Not Found',
        codeError: HttpStatus.NOT_FOUND,
      });
    }

    return exists;
  }
}
