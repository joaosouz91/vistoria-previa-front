import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoCor'
})
export class TipoCorPipe implements PipeTransform {
  
  transform(value: string, args?: any): String {
    switch (value) {
      case 'C':
        return 'Comum';
      case 'M':
        return 'Metálica';
      case 'P':
        return 'Perolizada';
      default:
        return null;
    }
  }
}
