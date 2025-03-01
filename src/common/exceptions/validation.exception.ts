import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { BaseException } from './base.exception';

/**
 * Excepción personalizada para errores de validación.
 * Lanza un error HTTP 400 con un mensaje y los detalles de los errores de validación.
 *
 * @example
 * const errors = [{ property: 'name', constraints: { isString: 'name must be a string' } }];
 * throw new ValidationException(errors);
 * // Respuesta: { success: false, message: "Validation failed", errors: [{ field: "name", message: "name must be a string" }], statusCode: 400 }
 */
export class ValidationException extends BaseException {
  constructor(errors: ValidationError[], errorCode: string = 'VALIDATION_FAILED') {
    const errorMessages = ValidationException.formatErrors(errors);
    super(
      'Validation failed',
      HttpStatus.BAD_REQUEST,
      errorCode,
      { errors: errorMessages }, // Detalles estructurados
    );
  }

  /**
   * Formatea los errores de validación en una estructura más amigable.
   * @param errors - Arreglo de errores de validación de class-validator
   * @returns Lista de objetos con campo y mensaje
   */
  private static formatErrors(errors: ValidationError[]): { field: string; message: string }[] {
    return errors.map((error) => {
      const constraintMessages = error.constraints
        ? Object.values(error.constraints)
        : ['Validation error'];
      return {
        field: error.property,
        message: constraintMessages[0], // Toma el primer mensaje de las restricciones
      };
    });
  }
}