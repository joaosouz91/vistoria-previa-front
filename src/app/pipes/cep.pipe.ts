import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(value: string, args?: any): String {
    if (value) {
      return this.pad(value, 8).replace(/^(\d{0,5})(\d{0,3})/, '$1-$2');
    }

    return null;
  }

  pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
