import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenTokenService {
  constructor(private jwtService: JwtService) {}
  async genToken(payload: object) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async verifyToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    return payload;
  }
}
