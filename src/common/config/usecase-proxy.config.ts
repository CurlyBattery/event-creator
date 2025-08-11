import { Provider } from '@nestjs/common';
import { UseCaseProxy } from '@common/usecase-proxy/domain/use-case-proxy';

type UseCaseConstructor<T> = new (...args: any[]) => T;

export function createUseCaseProvider<T>(
  provideToken: string,
  useCaseClass: UseCaseConstructor<T>,
  inject: any[],
): Provider {
  return {
    inject,
    provide: provideToken,
    useFactory: (...deps: any[]) => {
      const useCaseInstance = new useCaseClass(...deps);
      return new UseCaseProxy(useCaseInstance);
    },
  };
}
