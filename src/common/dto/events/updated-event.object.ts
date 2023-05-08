import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseObject } from '../response/response.object';

@ObjectType()
export class UpdatedEventObject extends ResponseObject {
  @Field({ nullable: true })
  dataUpdated: string | null;
}
