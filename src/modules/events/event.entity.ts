import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field(() => String)
  event_id: string;

  @Field(() => String)
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date)
  start_time: Date;

  @Field(() => Date)
  end_time: Date;

  @Field({ nullable: true })
  location?: string;

  @Field(() => String)
  userId: string;

  @Field(() => Date, { defaultValue: new Date(), nullable: true })
  created_at: Date;
  @Field(() => Date, { defaultValue: new Date(), nullable: true })
  updated_at: Date;
}
