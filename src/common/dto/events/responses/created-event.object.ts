import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseObject } from '../../response/response.object';
import { MinDate } from 'class-validator';

@ObjectType()
class CreateEventEventObject {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  @MinDate(new Date(), {
    message: 'Start time must be greater than current time',
  })
  start_time: Date;

  @Field()
  @MinDate(new Date(), {
    message: 'End time must be greater than current time',
  })
  end_time: Date;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  event_id: string;
}

@ObjectType()
export class CreatedEventObject extends ResponseObject {
  @Field({ nullable: true })
  dataCreated: CreateEventEventObject | null;
}
