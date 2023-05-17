import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateEventInput } from 'src/common/dto/events/create-event.input';
import { UpdateEventInput } from 'src/common/dto/events/update-event.input';
import { Pagination } from 'src/common/dto/pagination/pagination.dto';
import { FilterEventsInput } from 'src/common/dto/events/filter-events.input';
import { UpdatedEventObject } from 'src/common/dto/events/responses/updated-event.object';
import { DeletedEventObject } from 'src/common/dto/events/deleted-event.object';
import { SchedulerService } from '../scheduler/scheduler.service';
import { EventsEnum } from 'src/common/enum/events.enum';
import { CreatedEventObject } from 'src/common/dto/events/responses/created-event.object';
import { GetEventObject } from 'src/common/dto/events/responses/get-event.object';
import { GetAllEventsObject } from 'src/common/dto/events/responses/getAll-events.object';
import * as moment from 'moment-timezone';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    private schedulerService: SchedulerService,
  ) {}

  async findAll(
    userId: string,
    pagination: Pagination = { offset: 1, first: 5 },
    filter: FilterEventsInput,
  ): Promise<GetAllEventsObject> {
    try {
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

      const events = await this.eventRepository.find({
        skip: first * (offset - 1),
        take: first,
        where: whereStatement,
      });

      if (events.length === 0)
        return {
          code: 204,
          success: true,
          rowsAffected: 0,
          data: null,
          message: 'No events found',
        };

      return {
        code: 200,
        success: true,
        rowsAffected: events.length,
        data: events,
        message: 'Events found',
      };
    } catch (e) {
      console.error(e);
      return {
        code: 500,
        success: false,
        rowsAffected: 0,
        data: null,
        message: 'Internal server error',
      };
    }
  }

  async findOne(userId: string, event_id: string): Promise<GetEventObject> {
    try {
      const event = await this.eventRepository.findOne({
        where: { event_id, userId },
      });
      if (!event)
        return {
          code: 204,
          success: true,
          rowsAffected: 0,
          data: null,
          message: 'No event found with the given event_id',
        };

      return {
        code: 200,
        success: true,
        rowsAffected: 0,
        data: event,
        message: 'Event found',
      };
    } catch (e) {
      console.error(e);
      return {
        code: 500,
        success: false,
        rowsAffected: 0,
        data: null,
        message: 'Internal server error',
      };
    }
  }

  async create(
    userId: string,
    event: CreateEventInput,
  ): Promise<CreatedEventObject> {
    try {
      const eventPayload = { ...event, userId };
      const startTimeUTC = moment
        .tz(eventPayload.start_time, 'UTC')
        .format('YYYY-MM-DD HH:mm:ss');

      const endTimeUTC = moment
        .tz(eventPayload.end_time, 'UTC')
        .format('YYYY-MM-DD HH:mm:ss');

      eventPayload.start_time = new Date(startTimeUTC);
      eventPayload.end_time = new Date(endTimeUTC);

      console.log('Event programated at: ', eventPayload.start_time);
      console.log('Server time: ', new Date());

      const eventCreated = await this.eventRepository.save(eventPayload);

      await this.schedulerService.scheduleNextEvent(EventsEnum.START_EVENT);

      return {
        code: 201,
        success: true,
        rowsAffected: 1,
        dataCreated: eventCreated,
        message: 'Event created successfully',
      };
    } catch (e) {
      console.error(e);
      return {
        code: 500,
        success: false,
        rowsAffected: 0,
        dataCreated: null,
        message: 'Internal server error',
      };
    }
  }

  async update(
    userId: string,
    event_id: string,
    event: UpdateEventInput,
  ): Promise<UpdatedEventObject> {
    const eventUpdated = await this.eventRepository.update(
      { event_id, userId },
      { ...event },
    );

    if (eventUpdated.affected === 0) {
      return {
        code: 204,
        success: false,
        rowsAffected: eventUpdated.affected,
        dataUpdated: null,
        message: 'No event found with the given event_id',
      };
    }

    await this.schedulerService.scheduleNextEvent(EventsEnum.START_EVENT);
    await this.schedulerService.scheduleNextEvent(
      EventsEnum.BEFORE_START_EVENT,
    );
    return {
      code: 200,
      success: true,
      rowsAffected: eventUpdated.affected,
      dataUpdated: event_id,
      message: 'Event updated successfully',
    };
  }

  async delete(userId: string, event_id: string): Promise<DeletedEventObject> {
    const eventDeleted = await this.eventRepository.delete({
      event_id,
      userId,
    });

    if (eventDeleted.affected === 0) {
      return {
        code: 204,
        success: false,
        rowsAffected: eventDeleted.affected,
        dataDeleted: null,
        message: 'No event found with the given event_id',
      };
    }
    await this.schedulerService.scheduleNextEvent(EventsEnum.START_EVENT);
    await this.schedulerService.scheduleNextEvent(
      EventsEnum.BEFORE_START_EVENT,
    );
    return {
      code: 200,
      success: true,
      rowsAffected: eventDeleted.affected,
      dataDeleted: event_id,
      message: 'Event deleted succesfully',
    };
  }
}
