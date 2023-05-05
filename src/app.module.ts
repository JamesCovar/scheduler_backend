import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './shared/graphql/graphql.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [GraphqlModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
