import { InputType } from '@nestjs/graphql';
import { UpdateEventInput } from './update-event.input';

@InputType()
export class FilterEventsInput extends UpdateEventInput {}
