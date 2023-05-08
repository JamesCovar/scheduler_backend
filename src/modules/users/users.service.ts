import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { User } from './users.entity';
import { SignUpUserInput } from 'src/common/dto/auth/signup-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });
    return user;
  }

  async create(userObj: SignUpUserInput) {
    const user = await this.prisma.users.create({ data: userObj });
    return user;
  }
}
