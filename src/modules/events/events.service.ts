import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateEventInput } from 'src/common/dto/events/create-event.input';
import { UpdateEventInput } from 'src/common/dto/events/update-event.input';
import { Pagination } from 'src/common/dto/pagination/pagination.dto';
import { FilterEventsInput } from 'src/common/dto/events/filter-events.input';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    pagination: Pagination = { offset: 1, first: 5 },
    filter: FilterEventsInput,
  ): Promise<Event[]> {
    const { offset, first } = pagination;

    //TODO: In future create an abstract function to build the where statement
    const whereStatement: any = {};
    if (filter?.start_time) {
      whereStatement.start_time = { gte: filter.start_time };
    }
    if (filter?.end_time) {
      whereStatement.end_time = { lte: filter.end_time };
    }
    if (filter?.description) {
      whereStatement.description = { contains: filter.description };
    }
    if (filter?.title) {
      whereStatement.title = { contains: filter.title };
    }
    if (filter?.location) {
      whereStatement.location = { contains: filter.location };
    }

    const events = await this.prisma.events.findMany({
      skip: first * (offset - 1),
      take: first,
      where: whereStatement,
    });

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
