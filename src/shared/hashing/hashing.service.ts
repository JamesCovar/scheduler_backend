import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  async hashString(stringToHash: string, saltOrRounds = 10) {
    const hash = await bcrypt.hash(stringToHash, saltOrRounds);
    return hash;
  }

  async compareStringToHash(stringToCompare: string, hash: string) {
    const isMatch = await bcrypt.compare(stringToCompare, hash);
    return isMatch;
  }
}
