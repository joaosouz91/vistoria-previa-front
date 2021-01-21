import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoCarroceria'
})
export class FormatoCarroceriaPipe implements PipeTransform {
  
  transform(value: number, args?: any): String {
    switch (value) {
      case 1:
        return 'ABERTA';
      case 2:
        return 'FECHADA';
      default:
        return null;
    }
  }
}
