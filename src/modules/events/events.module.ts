import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), SchedulerModule],
  providers: [EventsService, EventsResolver, PrismaService],
})
export class EventsModule {}
