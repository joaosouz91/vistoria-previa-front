import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keyvalue'})
export class KeysPipe implements PipeTransform {
  transform(reg, args:string[]) : any {
    if(reg == null || reg == undefined) return;
    let keyValue = [];
    for (let i=0; i < Object.keys(reg).length; i++) {
        keyValue.push({'key' : Object.keys(reg)[i], 'value' : Object.values(reg)[i]});
    }
    return keyValue;
  }
}