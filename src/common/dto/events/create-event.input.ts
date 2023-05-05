import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field()
  title: string;
  @Field()
  description?: string;
  @Field()
  start_time: Date;
  @Field()
  end_time: Date;
  @Field()
  location?: string;
}
