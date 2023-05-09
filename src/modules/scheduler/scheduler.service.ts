import { Injectable } from '@nestjs/common';
import { EventsEnum } from 'src/common/enum/events.enum';
import { DateConvertService } from 'src/shared/dateConvert/dateConvert.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { TimeoutReminderService } from 'src/shared/timeoutReminder/timeoutReminder.service';

@Injectable()
export class SchedulerService {
  constructor(
    private prisma: PrismaService,
    private dateConvertService: DateConvertService,
    private timeoutReminderService: TimeoutReminderService,
  ) {}

  async findNextEvent() {
    const today = new Date();
    console.log(today);
    const nextEvent = await this.prisma.events.findFirst({
      where: { start_time: { gte: today } },
    });

    return nextEvent;
  }

  async scheduleNextEvent(millisecondsBeforeStart = 600000) {
    const startEventProgramated = this.timeoutReminderService.findTimeout(
      EventsEnum.START_EVENT,
    );
    const beforeEventProgramated = this.timeoutReminderService.findTimeout(
      EventsEnum.BEFORE_START_EVENT,
    );

    if (startEventProgramated)
      this.timeoutReminderService.deleteTimeout(EventsEnum.START_EVENT);
    if (beforeEventProgramated)
      this.timeoutReminderService.deleteTimeout(EventsEnum.BEFORE_START_EVENT);

    const nextEvent = await this.findNextEvent();
    const today = new Date();

    const milliseconds = this.dateConvertService.getMilliSecondsBetweenDates(
      today,
      nextEvent.start_time,
    );

    const notifyBeforeStart = milliseconds - millisecondsBeforeStart;
    if (notifyBeforeStart > 0)
      this.timeoutReminderService.addTimeout(
        EventsEnum.BEFORE_START_EVENT,
        milliseconds - millisecondsBeforeStart,
        () => console.log('Evento a punto de empezar'),
      );

    this.timeoutReminderService.addTimeout(
      EventsEnum.START_EVENT,
      milliseconds,
      this.scheduleNextEvent,
    );
  }
}
