import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseObject } from '../../response/response.object';

@ObjectType()
class EventObject {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  start_time: Date;

  @Field({ nullable: true })
  end_time: Date;

  @Field({ nullable: true })
  location?: string;
}

@ObjectType()
export class GetEventObject extends ResponseObject {
  @Field({ nullable: true })
  data: EventObject | null;
}
