import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

export class ResponseFormat<T> {
  isArray: boolean;
  path: string;
  duration: string;
  method: string;

  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse<Response>();

    const originalJson = response.json.bind(response);

    response.json = (data: any) => {
      if (response.headersSent) {
        return originalJson(data);
      }
      if (
        data &&
        typeof data === 'object' &&
        'data' in data &&
        'isArray' in data &&
        'path' in data
      ) {
        return originalJson(data);
      }
      const formattedResponse: ResponseFormat<any> = {
        data,
        isArray: Array.isArray(data),
        path: request.path,
        duration: `${Date.now() - now}ms`,
        method: request.method,
      };
      return originalJson(formattedResponse);
    };

    return next.handle().pipe(
      map((data) => {
        if (response.headersSent) {
          return data;
        }
        if (
          data &&
          typeof data === 'object' &&
          'data' in data &&
          'isArray' in data &&
          'path' in data
        ) {
          return data;
        }

        return {
          data,
          isArray: Array.isArray(data),
          path: request.path,
          duration: `${Date.now() - now}ms`,
          method: request.method,
        };
      }),
    );
  }
}
