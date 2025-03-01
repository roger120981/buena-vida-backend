import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Clase base para excepciones personalizadas en la aplicación.
 * Extiende HttpException de NestJS y proporciona una estructura de respuesta consistente.
 *
 * @example
 * throw new BaseException('Something went wrong', HttpStatus.BAD_REQUEST);
 * // Respuesta: { success: false, message: "Something went wrong", statusCode: 400 }
 */
export class BaseException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus,
    errorCode?: string,
    details?: Record<string, any>,
  ) {
    if (!message || !Object.values(HttpStatus).includes(status)) {
      throw new Error('Invalid parameters for BaseException: message and valid status are required');
    }
    super(
      {
        success: false,
        message,
        errorCode: errorCode || undefined,
        details: details || undefined,
      },
      status,
    );
  }
}