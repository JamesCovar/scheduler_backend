import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  start_time: Date;
  @Field({ nullable: true })
  end_time: Date;
  @Field({ nullable: true })
  location: string;
}
