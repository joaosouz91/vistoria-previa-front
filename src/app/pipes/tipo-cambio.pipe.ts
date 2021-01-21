import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoCambio'
})
export class TipoCambioPipe implements PipeTransform {
  
  transform(value: number, args?: any): String {
    console.log(value);
    switch (value) {
      case 1:
        return 'Mecânico';
      case 2:
        return 'Automático';
      default:
        return null;
    }
  }
}
