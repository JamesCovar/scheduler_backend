import { Injectable } from '@nestjs/common';
import { differenceInMilliseconds } from 'date-fns';

@Injectable()
export class DateConvertService {
  getMilliSecondsBetweenDates(startDate: Date, endDate: Date): number {
    return differenceInMilliseconds(endDate, startDate);
  }
}
