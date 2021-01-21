import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpj'
})
export class CpfCnpjPipe implements PipeTransform {

  transform(value: string, tipo?: string): String {
    if (value) {
      if (!tipo) {
        tipo = value.toString().length <= 11 ? 'F' : 'J';
      }

      if (tipo == 'F') {
        return this.pad(value, 11).replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1.$2.$3-$4');
      } else {
        return this.pad(value, 14).replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/, '$1.$2.$3/$4-$5');
      }
    }

    return null;
  }

  pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
