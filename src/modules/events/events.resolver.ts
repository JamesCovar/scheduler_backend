import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { CreateEventInput } from 'src/common/dto/events/create-event.input';

@Resolver((of) => Event)
export class EventsResolver {
  constructor(private eventsService: EventsService) {}

  @Query((returns) => [Event])
  getEvents(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Query((returns) => Event)
  getEvent(event_id: string): Promise<Event> {
    return this.eventsService.findOne(event_id);
  }

  @Mutation((returns) => Event)
  createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
  ): Promise<Event> {
    return this.eventsService.create(createEventInput);
  }

  @Mutation((returns) => Event)
  deleteEvent(@Args('event_id') event_id: string): Promise<Event> {
    return this.eventsService.delete(event_id);
  }
}
