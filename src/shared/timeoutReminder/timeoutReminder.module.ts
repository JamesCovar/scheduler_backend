import { Logger, Module } from '@nestjs/common';
import { TimeoutReminderService } from './timeoutReminder.service';
import { SchedulerRegistry } from '@nestjs/schedule';

@Module({
  imports: [],
  providers: [TimeoutReminderService, SchedulerRegistry, Logger],
  exports: [TimeoutReminderService],
})
export class TimeoutReminderModule {}
