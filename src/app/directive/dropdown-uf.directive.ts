import { Directive, Host, Self, Optional, NgModule } from '@angular/core';
import { EstadoService } from '../service/estado.service';
import { Dropdown } from 'primeng/dropdown';

@Directive({
  selector: '[dropdownUf]'
})
export class DropdownUfDirective {

  constructor(@Host() @Self() @Optional() public host: Dropdown, private service: EstadoService) {

    host.options = [{}];
    this.service.getEstados().forEach(uf => host.options.push({ label: uf.sigla, value: uf.sigla }));
  }

}

@NgModule({
  declarations: [
    DropdownUfDirective
  ],
  exports: [DropdownUfDirective]
})
export class DropdownUfModel { }