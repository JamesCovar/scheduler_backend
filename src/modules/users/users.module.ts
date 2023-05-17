import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { DbModule } from 'src/shared/db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
