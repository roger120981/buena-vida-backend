import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof HttpException) {
          // Re-lanzar excepciones HTTP (como BadRequestException o NotFoundException) sin modificarlas
          return throwError(() => err);
        }
        // Para otros errores no manejados, devolver un 500 con más detalles
        return throwError(() => new HttpException(
          {
            success: false,
            message: err.message || 'Internal server error',
            statusCode: 500,
            error: err.name || 'UnknownError',
            stack: err.stack // Incluye el stack para depuración (solo en desarrollo)
          },
          500,
        ));
      }),
    );
  }
}