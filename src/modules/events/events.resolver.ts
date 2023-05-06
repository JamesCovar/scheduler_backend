import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { CreateEventInput } from 'src/common/dto/events/create-event.input';
import { UpdateEventInput } from 'src/common/dto/events/update-event.input';
import { Pagination } from 'src/common/dto/pagination/pagination.dto';
import { FilterEventsInput } from 'src/common/dto/events/filter-events.input';

@Resolver((of) => Event)
export class EventsResolver {
  constructor(private eventsService: EventsService) {}

  @Query(() => [Event])
  getEvents(
    @Args('pagination') pagination: Pagination,
    @Args('filter', { nullable: true }) filter?: FilterEventsInput,
  ): Promise<Event[]> {
    return this.eventsService.findAll(pagination, filter);
  }

  @Query(() => Event)
  getEvent(event_id: string): Promise<Event> {
    return this.eventsService.findOne(event_id);
  }

  @Mutation(() => Event)
  updateEvent(
    @Args('event_id') event_id: string,
    @Args('event') event: UpdateEventInput,
  ): Promise<Event> {
    return this.eventsService.update(event_id, event);
  }

  @Mutation(() => Event)
  createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
  ): Promise<Event> {
    return this.eventsService.create(createEventInput);
  }

  @Mutation(() => Event)
  deleteEvent(@Args('event_id') event_id: string): Promise<Event> {
    return this.eventsService.delete(event_id);
  }
}
