import { NgModule } from '@angular/core';

import { PostoRoutingModule } from './posto-routing.module';
import { PostoComponent } from '../posto-consultar/posto.component';
import { PostoEditarComponent } from '../posto-editar/posto-editar.component';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ConsultaPostoComponent } from '../component/consulta-posto/consulta-posto.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { DropdownUfModel } from '../../../directive/dropdown-uf.directive';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    PostoComponent,
    PostoEditarComponent,
    ConsultaPostoComponent,
  ],
  imports: [
    PostoRoutingModule,
    FormsModule,
    CommonModule,
    FieldsetModule,
    PanelModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    CheckboxModule,
    RadioButtonModule,
    ButtonModule,
    DialogModule,
    DropdownUfModel
  ],
  exports: [ConsultaPostoComponent]
})
export class PostoModule { }
