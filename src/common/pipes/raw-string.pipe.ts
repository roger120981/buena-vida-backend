import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class RawStringPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value; // Devuelve el valor tal cual, sin transformación
  }
}