import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { DateConvertService } from 'src/shared/dateConvert/dateConvert.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { TimeoutReminderModule } from 'src/shared/timeoutReminder/timeoutReminder.module';

@Module({
  imports: [TimeoutReminderModule],
  providers: [SchedulerService, DateConvertService, PrismaService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
