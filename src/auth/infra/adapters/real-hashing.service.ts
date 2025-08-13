import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { HashingService } from '@auth/infra/ports/hashing.service';

let salt: string;

@Injectable()
export class RealHashingService implements HashingService {
  constructor() {
    salt = bcrypt.genSaltSync(10);
  }

  async hashPlain(plain: string): Promise<string> {
    const hash = await bcrypt.hash(plain, salt);

    return hash;
  }

  async assertSame(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }
}
