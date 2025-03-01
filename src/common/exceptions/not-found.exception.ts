import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

/**
 * Excepción personalizada para recursos no encontrados.
 * Lanza un error HTTP 404 con un mensaje descriptivo.
 *
 * @example
 * throw new NotFoundException('User', 123);
 * // Respuesta: { success: false, message: "User with ID 123 not found", statusCode: 404 }
 *
 * @example
 * throw new NotFoundException('User', 'abc', 'USER_NOT_FOUND', { field: 'email' });
 * // Respuesta: { success: false, message: "User with ID abc not found", errorCode: "USER_NOT_FOUND", details: { field: "email" }, statusCode: 404 }
 */
export class NotFoundException extends BaseException {
  constructor(
    entity: string,
    id: number | string,
    errorCode?: string,
    details?: Record<string, any>,
  ) {
    if (!entity || id == null) {
      throw new Error('Entity and ID must be provided for NotFoundException');
    }
    super(`${entity} with ID ${id} not found`, HttpStatus.NOT_FOUND, errorCode, details);
  }

  /**
   * Crea una excepción para casos donde el criterio no es un ID.
   * @param entity - El tipo de entidad (e.g., "User", "Participant")
   * @param criteria - El criterio de búsqueda (e.g., "email: test@example.com")
   * @param errorCode - Código de error opcional
   * @param details - Detalles adicionales opcionales
   */
  static byCriteria(
    entity: string,
    criteria: string,
    errorCode?: string,
    details?: Record<string, any>,
  ): NotFoundException {
    return new NotFoundException(entity, criteria, errorCode, details);
  }
}