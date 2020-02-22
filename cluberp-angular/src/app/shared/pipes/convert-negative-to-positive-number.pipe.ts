import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'convertNegativeToPositiveNumber'
})
export class ConvertNegativeToPositiveNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Number(value) * Number(-1);
  }

}
