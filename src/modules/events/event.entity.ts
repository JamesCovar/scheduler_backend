import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity({ name: 'events' })
export class Event {
  @Field(() => String)
  @Column({ primary: true, type: 'uuid', generated: 'uuid' })
  event_id: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column()
  description?: string;

  @Field(() => Date)
  @Column()
  start_time: Date;

  @Field(() => Date)
  @Column()
  end_time: Date;

  @Field({ nullable: true })
  @Column()
  location?: string;

  @Field(() => String)
  @Column()
  userId: string;

  @Field(() => Date, { defaultValue: new Date(), nullable: true })
  @Column({ default: new Date() })
  created_at: Date;

  @Field(() => Date, { defaultValue: new Date(), nullable: true })
  @Column({ default: new Date() })
  updated_at: Date;
}
