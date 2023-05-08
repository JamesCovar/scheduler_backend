import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BearerTokenInput {
  @Field({ nullable: true })
  token: string;
}
