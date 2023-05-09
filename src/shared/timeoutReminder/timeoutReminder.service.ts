import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { EventsEnum } from 'src/common/enum/events.enum';

@Injectable()
export class TimeoutReminderService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private logger: Logger,
  ) {}

  async addTimeout(
    name: EventsEnum,
    miliseconds: number,
    callbackFn: () => void,
  ) {
    const callback = () => {
      callbackFn();
    };

    const timeout = setTimeout(callback, miliseconds);
    this.schedulerRegistry.addTimeout(name, timeout);
  }

  deleteTimeout(name: string) {
    this.schedulerRegistry.deleteTimeout(name);
    this.logger.warn(`Timeout ${name} deleted / desactivated`);
  }

  findTimeout(name: string) {
    const allEvents = this.schedulerRegistry.getTimeouts();
    console.log(allEvents);
    const existEvent = allEvents.find((event) => event === name);

    return existEvent?.length > 0 ? true : false;
  }
}
