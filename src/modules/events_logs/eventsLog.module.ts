import { Module } from '@nestjs/common';
import { EventsLogs } from './eventsLog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsLogService } from './eventsLog.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventsLogs])],
  providers: [EventsLogService],
  exports: [EventsLogService],
})
export class EventsLogsModule {}
