import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestricaoRoutingModule } from './restricao-routing.module';
import { RestricaoVisualizarComponent } from './restricao-visualizar.component';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DetalheDoItemService } from './detalhe-do-item-service';

@NgModule({
  declarations: [RestricaoVisualizarComponent],
  imports: [
    CommonModule,
    RestricaoRoutingModule,
    FieldsetModule,
    TableModule,
    ButtonModule,
    PanelModule
  ],
  providers: [
    DetalheDoItemService
  ]
})
export class RestricaoModule { }
