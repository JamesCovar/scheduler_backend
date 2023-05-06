import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateEventInput } from 'src/common/dto/events/create-event.input';
import { UpdateEventInput } from 'src/common/dto/events/update-event.input';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Event[]> {
    const events = await this.prisma.events.findMany();

    return events;
  }

  async findOne(event_id: string): Promise<Event> {
    const event = await this.prisma.events.findUnique({ where: { event_id } });
    return event;
  }

  async create(event: CreateEventInput): Promise<Event> {
    const eventCreated = await this.prisma.events.create({ data: event });
    return eventCreated;
  }

  async update(event_id: string, event: UpdateEventInput): Promise<Event> {
    const eventUpdated = await this.prisma.events.update({
      where: { event_id },
      data: { ...event },
    });
    return eventUpdated;
  }

  async delete(event_id: string): Promise<Event> {
    const eventDeleted = await this.prisma.events.delete({
      where: { event_id },
    });
    return eventDeleted;
  }
}
