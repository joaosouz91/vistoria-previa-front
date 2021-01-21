import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispensaRoutingModule } from './dispensa-routing.module';
import { DispensaComponent } from './dispensar.component';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConteudoColunaTipoService } from './conteudo-coluna-tipo-service';

@NgModule({
  declarations: [DispensaComponent],
  imports: [
    CommonModule,
    DispensaRoutingModule,
    FormsModule,
    PanelModule,
    DropdownModule,
    ButtonModule,
    InputTextareaModule
  ],
  providers: [
    ConteudoColunaTipoService
  ]
})
export class DispensaModule { }
