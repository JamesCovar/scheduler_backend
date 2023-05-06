import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsDate, IsDateString, IsString } from 'class-validator';

@InputType()
export class CreateEventInput {
  @IsAlpha()
  @Field()
  title: string;

  @IsString()
  @Field({ nullable: true })
  description?: string;

  @IsDate()
  @Field()
  start_time: Date;

  @IsDate()
  @Field()
  end_time: Date;

  @IsString()
  @Field({ nullable: true })
  location?: string;
}
