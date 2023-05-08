import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseObject } from '../response/response.object';
import { Event } from '../../../modules/events/event.entity';

@ObjectType()
export class DeletedEventObject extends ResponseObject {
  @Field({ nullable: true })
  dataDeleted: string | null;
}
