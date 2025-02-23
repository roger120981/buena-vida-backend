import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class TransformStringPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Field must be a string');
    }
    return value.toString(); // Convierte cualquier tipo a cadena
  }
}
