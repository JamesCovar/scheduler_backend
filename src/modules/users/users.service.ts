import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { User } from './users.entity';
import { SignUpUserInput } from 'src/common/dto/auth/signup-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async create(userObj: SignUpUserInput) {
    const user = await this.userRepository.save(userObj);
    return user;
  }
}
