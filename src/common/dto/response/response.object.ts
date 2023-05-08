import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseObject {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => Number)
  rowsAffected: number;

  @Field(() => String)
  message: string;

  @Field(() => Number)
  code: number;
}
