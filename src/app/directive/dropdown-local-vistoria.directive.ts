import { Directive, Host, Self, Optional, NgModule } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';

@Directive({
  selector: '[dropdownLocalVistoria]'
})
export class DropdownLocalVistoriaDirective {

  constructor(@Host() @Self() @Optional() public host: Dropdown) {

    host.options = [{label:'Domicílio', value:'D'}, {label:'Posto', value:'P'}];
  }

}

@NgModule({
  declarations: [
    DropdownLocalVistoriaDirective
  ],
  exports: [DropdownLocalVistoriaDirective]
})
export class DropdownLocalVistoriaModule { }