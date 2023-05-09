import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateEventInput } from 'src/common/dto/events/create-event.input';
import { UpdateEventInput } from 'src/common/dto/events/update-event.input';
import { Pagination } from 'src/common/dto/pagination/pagination.dto';
import { FilterEventsInput } from 'src/common/dto/events/filter-events.input';
import { UpdatedEventObject } from 'src/common/dto/events/updated-event.object';
import { DeletedEventObject } from 'src/common/dto/events/deleted-event.object';
import { SchedulerService } from '../scheduler/scheduler.service';

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
    private schedulerService: SchedulerService,
  ) {}

  async findAll(
    userId: string,
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

    whereStatement.userId = userId;

    const events = await this.prisma.events.findMany({
      skip: first * (offset - 1),
      take: first,
      where: whereStatement,
    });

    return events;
  }

  async findOne(userId: string, event_id: string): Promise<Event> {
    const event = await this.prisma.events.findFirst({
      where: { event_id, userId },
    });
    return event;
  }

  async create(userId: string, event: CreateEventInput): Promise<Event> {
    const eventPayload = { ...event, userId };
    const eventCreated = await this.prisma.events.create({
      data: eventPayload,
    });

    await this.schedulerService.scheduleNextEvent();
    return eventCreated;
  }

  async update(
    userId: string,
    event_id: string,
    event: UpdateEventInput,
  ): Promise<UpdatedEventObject> {
    const eventUpdated = await this.prisma.events.updateMany({
      where: { event_id, userId },
      data: { ...event },
    });

    if (eventUpdated.count === 0) {
      return {
        code: 204,
        success: false,
        rowsAffected: eventUpdated.count,
        dataUpdated: null,
        message: 'No event found with the given event_id',
      };
    }

    await this.schedulerService.scheduleNextEvent();
    return {
      code: 200,
      success: true,
      rowsAffected: eventUpdated.count,
      dataUpdated: event_id,
      message: 'Event updated successfully',
    };
  }

  async delete(userId: string, event_id: string): Promise<DeletedEventObject> {
    const eventDeleted = await this.prisma.events.deleteMany({
      where: { event_id, userId },
    });

    if (eventDeleted.count === 0) {
      return {
        code: 204,
        success: false,
        rowsAffected: eventDeleted.count,
        dataDeleted: null,
        message: 'No event found with the given event_id',
      };
    }
    await this.schedulerService.scheduleNextEvent();
    return {
      code: 200,
      success: true,
      rowsAffected: eventDeleted.count,
      dataDeleted: event_id,
      message: 'Event deleted succesfully',
    };
  }
}
