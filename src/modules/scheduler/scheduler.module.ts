import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { DateConvertService } from 'src/shared/dateConvert/dateConvert.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { TimeoutReminderModule } from 'src/shared/timeoutReminder/timeoutReminder.module';
import { SmsSenderModule } from 'src/shared/smsSender/smsSender.module';
import { SmsSenderService } from 'src/shared/smsSender/smsSender.service';
import { EventsLogService } from '../events_logs/eventsLog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsLogs } from '../events_logs/eventsLog.entity';
import { Event } from '../events/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventsLogs]),
    TimeoutReminderModule,
    SmsSenderModule,
  ],
  providers: [
    SchedulerService,
    EventsLogService,
    DateConvertService,
    PrismaService,
    SmsSenderService,
  ],
  exports: [SchedulerService],
})
export class SchedulerModule {}
