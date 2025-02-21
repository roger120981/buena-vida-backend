import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  constructor(entity: string, id: number | string) {
    super(`${entity} with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
