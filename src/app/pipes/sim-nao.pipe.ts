import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simNao'
})
export class SimNaoPipe implements PipeTransform {

  transform(value: string, args?: any): String {
    switch (value) {
      case 'S':
        return 'SIM';
      case 'N':
        return 'NÃO';
      default:
        return null;
    }
  }
}
