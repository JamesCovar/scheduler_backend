import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseObject } from '../../response/response.object';

@ObjectType()
export class AuthObject extends ResponseObject {
  @Field({ nullable: true })
  token: string | null;
}
