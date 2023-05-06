import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class Pagination {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field({ nullable: true })
  first?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field({ nullable: true })
  offset?: number;
}
