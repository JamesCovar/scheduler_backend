import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsLogs } from './eventsLog.entity';
import { Repository } from 'typeorm';
import { CreateEventLogDTO, UpdateEventLogDTO } from './eventsLog.dto';

@Injectable()
export class EventsLogService {
  constructor(
    @InjectRepository(EventsLogs)
    private eventsLogsRepository: Repository<EventsLogs>,
  ) {}

  async createEventLog(payload: CreateEventLogDTO) {
    const newEventLog = await this.eventsLogsRepository.create(payload);
    await this.eventsLogsRepository.save(newEventLog);

    return newEventLog;
  }

  async updateEventLog(
    userId: string,
    eventId: string,
    payload: UpdateEventLogDTO,
  ) {
    await this.eventsLogsRepository.update({ userId, eventId }, payload);
  }

  async cancelEventLog(userId: string, eventId: string) {
    await this.eventsLogsRepository.update(
      { userId, eventId },
      { wasCanceled: true },
    );
  }

  async notifyEventLog(eventId: string) {
    await this.eventsLogsRepository.update(
      { id: eventId },
      {
        wasNotified: true,
      },
    );
  }
}
