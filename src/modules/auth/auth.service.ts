import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HashingService } from 'src/shared/hashing/hashing.service';
import { GenTokenService } from 'src/shared/genToken/genToken.service';
import { User } from '../users/users.entity';
import { SignUpUserInput } from 'src/common/dto/auth/signup-user.input';
import { AuthObject } from 'src/common/dto/auth/responses/auth.object';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashingService: HashingService,
    private genTokenService: GenTokenService,
  ) {}

  async signIn(email: string, pass: string): Promise<AuthObject> {
    try {
      const user = await this.usersService.findOne(email);
      const isMatch = await this.hashingService.compareStringToHash(
        pass,
        user.password,
      );

      if (!isMatch) {
        return {
          code: 401,
          message: 'Invalid credentials',
          success: false,
          rowsAffected: 0,
          token: null,
        };
      }

      const payload = { name: user.name, userId: user.user_id };
      const token = await this.genTokenService.genToken(payload);

      return {
        code: 200,
        message: 'User logged in successfully',
        token,
        success: true,
        rowsAffected: 0,
      };
    } catch (e) {
      console.error(e);
      return {
        code: 500,
        message: 'Internal server error',
        success: false,
        rowsAffected: 0,
        token: null,
      };
    }
  }

  async signUp(user: SignUpUserInput): Promise<AuthObject> {
    const passHash = await this.hashingService.hashString(user.password);
    user.password = passHash;

    const userExist = await this.usersService.findOne(user.email);
    if (userExist) {
      return {
        code: 409,
        message: 'User already exists, please login or use another email',
        success: false,
        rowsAffected: 0,
        token: null,
      };
    }

    const userCreated = await this.usersService.create(user);

    const payload = { name: userCreated.name, userId: userCreated.user_id };
    const token = await this.genTokenService.genToken(payload);

    return {
      code: 201,
      message: 'User created successfully',
      success: true,
      rowsAffected: 1,
      token,
    };
  }
}
