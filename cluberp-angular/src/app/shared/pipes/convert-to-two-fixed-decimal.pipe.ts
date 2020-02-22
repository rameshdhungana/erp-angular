import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'convertToTwoFixedDecimal'
})
export class ConvertToTwoFixedDecimalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Number(value).toFixed(2);
  }

}
