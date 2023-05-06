import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsDate, IsString } from 'class-validator';

@InputType()
export class UpdateEventInput {
  @IsAlpha()
  @Field({ nullable: true })
  title: string;

  @IsString()
  @Field({ nullable: true })
  description: string;

  @IsDate()
  @Field({ nullable: true })
  start_time: Date;

  @IsDate()
  @Field({ nullable: true })
  end_time: Date;

  @IsString()
  @Field({ nullable: true })
  location: string;
}
