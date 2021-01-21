import { NgModule } from '@angular/core';





import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';

import { InputTextModule } from 'primeng/inputtext';

import { InputCpfCnpjModule } from '../../../directive/input-cpf-cnpj.module';
import { PrestadoraRoutingModule } from './prestadora-routing.module';
import { PrestadoraComponent } from '../prestadora-consultar/prestadora.component';
import { PrestadoraEditarComponent } from '../prestadora-editar/prestadora-editar.component';
import { PostoModule } from '../../posto/posto-module/posto.module';
import { BtnListarPostosModule } from '../../posto/btn-listar-postos/btn-listar-postos.component';
import { PrestadoraVistoriaService } from './prestadora-vistoria-service';
import { CalendarBrModule } from '../../../directive/calendar-br.directive';

@NgModule({
  declarations: [
    PrestadoraComponent,
    PrestadoraEditarComponent
  ],
  imports: [
    CommonModule,
    PrestadoraRoutingModule,
    BtnListarPostosModule,
    PostoModule,
    FormsModule,
    FieldsetModule,
    InputCpfCnpjModule,
    PanelModule,
    SelectButtonModule,
    InputMaskModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    CalendarBrModule
  ],
  providers: [
    PrestadoraVistoriaService,
  ]
})
export class PrestadoraModule { }
