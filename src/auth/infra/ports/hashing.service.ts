export abstract class HashingService {
  abstract hashPlain(plain: string): Promise<string>;
  abstract assertSame(plain: string, hashed: string): Promise<boolean>;
}
