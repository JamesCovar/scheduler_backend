import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { CreateEventInput } from 'src/common/dto/events/create-event.input';
import { UpdateEventInput } from 'src/common/dto/events/update-event.input';
import { Pagination } from 'src/common/dto/pagination/pagination.dto';
import { FilterEventsInput } from 'src/common/dto/events/filter-events.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UpdatedEventObject } from 'src/common/dto/events/responses/updated-event.object';
import { DeletedEventObject } from 'src/common/dto/events/deleted-event.object';
import { GetEventObject } from 'src/common/dto/events/responses/get-event.object';
import { CreatedEventObject } from 'src/common/dto/events/responses/created-event.object';
import { GetAllEventsObject } from 'src/common/dto/events/responses/getAll-events.object';

@Resolver((of) => Event)
export class EventsResolver {
  constructor(private eventsService: EventsService) {}

  @Query(() => GetAllEventsObject)
  @UseGuards(JwtAuthGuard)
  getEvents(
    @Context() context,
    @Args('pagination') pagination: Pagination,
    @Args('filter', { nullable: true }) filter?: FilterEventsInput,
  ): Promise<GetAllEventsObject> {
    const { userId } = context.req.user;
    return this.eventsService.findAll(userId, pagination, filter);
  }

  @Query(() => GetEventObject)
  @UseGuards(JwtAuthGuard)
  getEvent(
    @Args('eventId') eventId: string,
    @Context() context,
  ): Promise<GetEventObject> {
    const { userId } = context.req.user;
    return this.eventsService.findOne(userId, eventId);
  }

  @Mutation(() => UpdatedEventObject)
  @UseGuards(JwtAuthGuard)
  updateEvent(
    @Args('event_id') event_id: string,
    @Args('event') event: UpdateEventInput,
    @Context() context,
  ): Promise<UpdatedEventObject> {
    const { userId } = context.req.user;
    return this.eventsService.update(userId, event_id, event);
  }

  @Mutation(() => CreatedEventObject)
  @UseGuards(JwtAuthGuard)
  createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
    @Context() context,
  ): Promise<CreatedEventObject> {
    //TODO: Get user id from context || jwt
    const { userId } = context.req.user;
    return this.eventsService.create(userId, createEventInput);
  }

  @Mutation(() => DeletedEventObject)
  @UseGuards(JwtAuthGuard)
  deleteEvent(
    @Args('event_id') event_id: string,
    @Context() context,
  ): Promise<DeletedEventObject> {
    const { userId } = context.req.user;
    return this.eventsService.delete(userId, event_id);
  }
}
