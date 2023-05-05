import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field((type) => String)
  event_id: string;

  @Field((type) => String)
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Date)
  start_time: Date;

  @Field((type) => Date)
  end_time: Date;

  @Field({ nullable: true })
  location?: string;

  @Field((type) => Date, { defaultValue: new Date(), nullable: true })
  created_at: Date;
  @Field((type) => Date, { defaultValue: new Date(), nullable: true })
  updated_at: Date;
}
