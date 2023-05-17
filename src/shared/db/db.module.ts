import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATA_BASE_CONFIG } from './config';
import { User } from 'src/modules/users/users.entity';
import { Event } from 'src/modules/events/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Event]),
    TypeOrmModule.forRoot(DATA_BASE_CONFIG),
  ],
  exports: [],
})
export class DbModule {}
