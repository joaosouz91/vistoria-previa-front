
// Importação 
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';




// Importação 
import { FranquiaRoutingModule } from './franquia-routing.module';
import { FranquiaComponent } from '../franquia-consultar/franquia.component';
import { FranquiaEditarComponent } from '../franquia-editar/franquia-editar.component';
import { InputComponente } from 'src/app/directive/input/input.component';
import { FranquiaService } from './franquia.service';
import { PrestadoraModule } from '../../prestadora/prestadora-module/prestadora.module';


@NgModule({
  declarations: [
    FranquiaComponent,
    FranquiaEditarComponent,
    InputComponente
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    FieldsetModule,
    PanelModule,
    DialogModule,
    FranquiaRoutingModule,
    SelectButtonModule,
    RadioButtonModule,
    DropdownModule,
    InputMaskModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    PrestadoraModule
  ],
  providers: [
    FranquiaService
  ]
})
export class FranquiaModule { }

