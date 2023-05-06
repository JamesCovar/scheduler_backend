import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsDate, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateEventInput {
  @IsAlpha()
  @IsOptional()
  @Field({ nullable: true })
  title?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsDate()
  @IsOptional()
  @Field({ nullable: true })
  start_time?: Date;

  @IsDate()
  @IsOptional()
  @Field({ nullable: true })
  end_time?: Date;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  location?: string;
}
