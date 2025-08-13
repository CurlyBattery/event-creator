import { Request } from 'express';
import type { AccessTokenPayload } from './access-token.payload';

export type RequestUser = {
  user: AccessTokenPayload;
} & Request;
