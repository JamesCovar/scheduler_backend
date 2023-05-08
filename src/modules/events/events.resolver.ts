import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { CreateEventInput } from 'src/common/dto/events/create-event.input';
import { UpdateEventInput } from 'src/common/dto/events/update-event.input';
import { Pagination } from 'src/common/dto/pagination/pagination.dto';
import { FilterEventsInput } from 'src/common/dto/events/filter-events.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { use } from 'passport';
import { UpdatedEventObject } from 'src/common/dto/events/updated-event.object';
import { DeletedEventObject } from 'src/common/dto/events/deleted-event.object';

@Resolver((of) => Event)
export class EventsResolver {
  constructor(private eventsService: EventsService) {}

  @Query(() => [Event])
  @UseGuards(JwtAuthGuard)
  getEvents(
    @Context() context,
    @Args('pagination') pagination: Pagination,
    @Args('filter', { nullable: true }) filter?: FilterEventsInput,
  ): Promise<Event[]> {
    const { userId } = context.req.user;
    console.log(userId);
    return this.eventsService.findAll(userId, pagination, filter);
  }

  @Query(() => Event)
  @UseGuards(JwtAuthGuard)
  getEvent(
    @Args('eventId') eventId: string,
    @Context() context,
  ): Promise<Event> {
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

  @Mutation(() => Event)
  @UseGuards(JwtAuthGuard)
  createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
    @Context() context,
  ): Promise<Event> {
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
