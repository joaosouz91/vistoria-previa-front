import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivergenciaRoutingModule } from './divergencia-routing.module';
import { DivergenciaComponent } from './divergencia.component';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DivergenciaService } from './divergencia-service';

@NgModule({
  declarations: [DivergenciaComponent],
  imports: [
    CommonModule,
    DivergenciaRoutingModule,
    FormsModule,
    PanelModule,
    DropdownModule,
    ButtonModule,
    InputTextareaModule
  ],
  providers: [
    DivergenciaService
  ]
})
export class DivergenciaModule { }
