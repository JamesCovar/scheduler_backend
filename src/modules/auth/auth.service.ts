import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HashingService } from 'src/shared/hashing/hashing.service';
import { GenTokenService } from 'src/shared/genToken/genToken.service';
import { User } from '../users/users.entity';
import { SignUpUserInput } from 'src/common/dto/auth/signup-user.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashingService: HashingService,
    private genTokenService: GenTokenService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const isMatch = await this.hashingService.compareStringToHash(
      pass,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { name: user.name, userId: user.user_id };
    const token = await this.genTokenService.genToken(payload);

    return { token };
  }

  async signUp(user: SignUpUserInput) {
    const passHash = await this.hashingService.hashString(user.password);
    user.password = passHash;
    const userCreated = await this.usersService.create(user);
    return userCreated;
  }
}
