import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { GenTokenService } from 'src/shared/genToken/genToken.service';
import { HashingService } from 'src/shared/hashing/hashing.service';
import { GenTokenModule } from 'src/shared/genToken/genToken.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './auth.strategy';
import { User } from '../users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GenTokenModule],
  providers: [
    AuthService,
    PrismaService,
    HashingService,
    UsersService,
    GenTokenService,
    AuthResolver,
    JwtStrategy,
    User,
  ],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
