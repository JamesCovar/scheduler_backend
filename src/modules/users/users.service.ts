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
    try {
      const verifyCode = Math.floor(1000 + Math.random() * 9000);
      const user = await this.userRepository.update(
        { user_id: userId },
        { newCellphone: phoneNumber, newCellphoneCode: verifyCode.toString() },
      );

      return {
        code: 200,
        message: 'Phone number changed successfully',
        success: true,
        rowsAffected: user.affected,
        data: {
          cellphone: phoneNumber,
          userId: userId,
          verified: false,
        },
      };
    } catch (e) {
      console.error(e);
      return {
        code: 500,
        message: 'Internal server error',
        success: false,
        rowsAffected: 0,
        data: null,
      };
    }
  }

  async verifyPhoneNumber(
    userId: string,
    verifyCode: string,
  ): Promise<ChangedCellphonerResp> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user || user.newCellphoneCode !== verifyCode)
      return {
        code: 400,
        message: 'Invalid verification code',
        success: false,
        rowsAffected: 0,
        data: null,
      };

    const updatedUser = await this.userRepository.update(
      { user_id: userId },
      {
        cellphone: user.newCellphone,
        newCellphone: null,
        newCellphoneCode: null,
      },
    );

    return {
      code: 200,
      message: 'Phone number verified successfully',
      success: true,
      rowsAffected: updatedUser.affected,
      data: {
        cellphone: user.newCellphone,
        userId: userId,
        verified: true,
      },
    };
  }
}
