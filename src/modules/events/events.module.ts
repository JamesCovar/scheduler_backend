import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SchedulerModule } from '../scheduler/scheduler.module';

@Module({
  imports: [SchedulerModule],
  providers: [EventsService, EventsResolver, PrismaService],
})
export class EventsModule {}
