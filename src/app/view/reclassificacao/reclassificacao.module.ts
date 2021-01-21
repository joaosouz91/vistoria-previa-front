import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReclassificacaoRoutingModule } from './reclassificacao-routing.module';
import { ReclassificacaoComponent } from './reclassificacao.component';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ReclassificacaoService } from './reclassificacao-service';

@NgModule({
  declarations: [ReclassificacaoComponent],
  imports: [
    CommonModule,
    ReclassificacaoRoutingModule,
    FormsModule,
    FieldsetModule,
    TableModule,
    DropdownModule,
    PanelModule,
    InputTextareaModule,
    ButtonModule
  ],
  providers: [
    ReclassificacaoService
  ]
})
export class ReclassificacaoModule { }
