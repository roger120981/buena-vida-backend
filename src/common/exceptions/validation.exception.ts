import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class ValidationException extends BaseException {
  constructor(errors: any) {
    super(`Validation failed: ${JSON.stringify(errors)}`, HttpStatus.BAD_REQUEST);
  }
}
