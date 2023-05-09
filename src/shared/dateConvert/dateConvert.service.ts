import { Injectable } from '@nestjs/common';
import { differenceInMilliseconds, differenceInMinutes } from 'date-fns';

@Injectable()
export class DateConvertService {
  getMilliSecondsBetweenDates(startDate: Date, endDate: Date): number {
    return differenceInMilliseconds(endDate, startDate);
  }

  getMinutesBetweenDates(startDate: Date, endDate: Date): number {
    return differenceInMinutes(endDate, startDate);
  }
}
