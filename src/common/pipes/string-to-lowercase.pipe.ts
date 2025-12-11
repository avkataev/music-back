import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StringToLowercasePipe implements PipeTransform {
  transform(value:any, metadata:ArgumentMetadata):any {
    if (typeof value === 'string') {
      return value.toLocaleLowerCase();
    }
    return value;
  }
}