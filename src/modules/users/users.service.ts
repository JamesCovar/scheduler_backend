import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { User } from './users.entity';
import { SignUpUserInput } from 'src/common/dto/auth/signup-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangedCellphonerResp } from './users.dto';

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

  async changePhoneNumber(
    userId: string,
    phoneNumber: string,
  ): Promise<ChangedCellphonerResp> {
    const user = await this.userRepository.update(
      { user_id: userId },
      { newCellphone: phoneNumber },
    );

    return {
      code: 200,
      message: 'Phone number changed successfully',
      success: true,
      rowsAffected: user.affected,
      data: {
        cellphone: user.raw[0].newCellphone,
        userId: user.raw[0].user_id,
        verified: false,
      },
    };
  }
}
