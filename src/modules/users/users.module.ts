import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { GenTokenModule } from 'src/shared/genToken/genToken.module';

@Module({
  imports: [],
  providers: [UsersService, PrismaService],
  exports: [],
})
export class UsersModule {}
