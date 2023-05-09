import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { DateConvertService } from 'src/shared/dateConvert/dateConvert.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { TimeoutReminderModule } from 'src/shared/timeoutReminder/timeoutReminder.module';
import { SmsSenderModule } from 'src/shared/smsSender/smsSender.module';
import { SmsSenderService } from 'src/shared/smsSender/smsSender.service';

@Module({
  imports: [TimeoutReminderModule, SmsSenderModule],
  providers: [
    SchedulerService,
    DateConvertService,
    PrismaService,
    SmsSenderService,
  ],
  exports: [SchedulerService],
})
export class SchedulerModule {}
