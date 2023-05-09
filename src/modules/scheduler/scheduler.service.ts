import { Injectable } from '@nestjs/common';
import { EventsEnum } from 'src/common/enum/events.enum';
import { DateConvertService } from 'src/shared/dateConvert/dateConvert.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SmsSenderService } from 'src/shared/smsSender/smsSender.service';
import { TimeoutReminderService } from 'src/shared/timeoutReminder/timeoutReminder.service';

@Injectable()
export class SchedulerService {
  constructor(
    private prisma: PrismaService,
    private dateConvertService: DateConvertService,
    private timeoutReminderService: TimeoutReminderService,
    private smsSenderService: SmsSenderService,
  ) {}

  async findNextEvent() {
    const today = new Date();
    const nextEvent = await this.prisma.events.findFirst({
      where: { start_time: { gte: today } },
    });

    return nextEvent;
  }

  async scheduleNextEvent(
    notifyLaunch: EventsEnum,
    millisecondsBeforeStart = 600000,
  ) {
    const startEvent = this.timeoutReminderService.findTimeout(notifyLaunch);
    if (startEvent) this.timeoutReminderService.deleteTimeout(notifyLaunch);

    const nextEvent = await this.findNextEvent();
    const today = new Date();
    if (!nextEvent) return;

    const milliseconds = this.dateConvertService.getMilliSecondsBetweenDates(
      today,
      nextEvent.start_time,
    );

    if (notifyLaunch === EventsEnum.START_EVENT) {
      this.timeoutReminderService.addTimeout(
        EventsEnum.START_EVENT,
        milliseconds,
        () => {
          this.sendSMSReminder(nextEvent.start_time, EventsEnum.START_EVENT);
          this.scheduleNextEvent(EventsEnum.START_EVENT);
        },
      );
    }

    if (notifyLaunch === EventsEnum.BEFORE_START_EVENT) {
      const notifyBeforeStart = milliseconds - millisecondsBeforeStart;
      if (notifyBeforeStart > 0)
        this.timeoutReminderService.addTimeout(
          EventsEnum.BEFORE_START_EVENT,
          milliseconds - millisecondsBeforeStart,
          () => {
            this.sendSMSReminder(
              nextEvent.start_time,
              EventsEnum.BEFORE_START_EVENT,
            );
            this.scheduleNextEvent(EventsEnum.BEFORE_START_EVENT);
          },
        );
    }
  }

  async sendSMSReminder(date: Date, notifyLaunch: EventsEnum) {
    const eventsProgramated = await this.findAllEventsProgramated(date);
    for (const event of eventsProgramated) {
      let message = '';
      if (notifyLaunch === EventsEnum.START_EVENT) {
        message = `You have an event that has started: ${event.title} at ${event.start_time}`;
      }
      if (notifyLaunch === EventsEnum.BEFORE_START_EVENT) {
        const now = new Date();
        const startInMinutes = this.dateConvertService.getMinutesBetweenDates(
          now,
          event.start_time,
        );
        message = `You have an event today: ${event.title} starts in ${startInMinutes} minutes`;
      }

      this.smsSenderService.sendSMS(event.users.cellphone, message);
    }
  }

  async findAllEventsProgramated(date: Date) {
    const currentEvent = this.prisma.events.findMany({
      where: { start_time: { gte: new Date(date) } },
      include: { users: true },
    });

    return currentEvent;
  }
}
