import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './shared/graphql/graphql.module';
import { EventsModule } from './modules/events/events.module';
import { UsersModule } from './modules/users/users.module';
import { GenTokenModule } from './shared/genToken/genToken.module';
import { AuthModule } from './modules/auth/auth.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { TimeoutReminderModule } from './shared/timeoutReminder/timeoutReminder.module';
import { DbModule } from './shared/db/db.module';

@Module({
  imports: [
    DbModule,
    GraphqlModule,
    GenTokenModule,
    AuthModule,
    EventsModule,
    UsersModule,
    SchedulerModule,
    TimeoutReminderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
