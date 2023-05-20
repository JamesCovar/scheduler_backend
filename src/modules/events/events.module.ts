import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
import { EventsLogs } from '../events_logs/eventsLog.entity';
import { EventsLogService } from '../events_logs/eventsLog.service';
import { SchedulerService } from '../scheduler/scheduler.service';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { DateConvertService } from 'src/shared/dateConvert/dateConvert.service';
import { TimeoutReminderModule } from 'src/shared/timeoutReminder/timeoutReminder.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventsLogs]),
    SchedulerModule,
    TimeoutReminderModule,
  ],
  providers: [
    EventsService,
    EventsResolver,
    PrismaService,
    EventsLogService,

    DateConvertService,
  ],
  controllers: [EventsController],
  exports: [EventsService],
})
export class EventsModule {}
