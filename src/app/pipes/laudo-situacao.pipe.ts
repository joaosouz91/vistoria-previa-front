import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'laudoSituacao'
})
export class LaudoSituacaoPipe implements PipeTransform {

  transform(value: string, args?: any): String {
    switch (value) {
      case 'S':
        return 'Vinculado';
      case 'N':
        return 'Não Vinculado';
      case 'A':
        return 'Não Vinculado';
      default:
        return null;
    }
  }
}
