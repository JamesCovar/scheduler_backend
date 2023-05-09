import { Field, ObjectType, extend } from '@nestjs/graphql';
import { ResponseObject } from '../../response/response.object';

@ObjectType()
class EventObjectData {
  @Field({ nullable: true })
  event_id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description?: string | null;

  @Field({ nullable: true })
  start_time: Date;

  @Field({ nullable: true })
  end_time: Date;

  @Field({ nullable: true })
  location?: string | null;

  @Field({ nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;

  @Field({ nullable: true })
  userId: string;
}

@ObjectType()
export class GetAllEventsObject extends ResponseObject {
  @Field((type) => [EventObjectData])
  data: EventObjectData[];
}
