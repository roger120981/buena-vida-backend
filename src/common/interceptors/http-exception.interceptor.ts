import { CallHandler, ExecutionContext, Injectable, NestInterceptor, BadRequestException } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class HttpExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof BadRequestException) {
          const response = err.getResponse();
          return throwError(() => new BadRequestException({ success: false, message: response['message'] }));
        }
        return throwError(() => err);
      })
    );
  }
}
