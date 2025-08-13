import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

@Injectable()
export class UuidGeneratorService {
  generateUUID = () => uuid.v4();
}
