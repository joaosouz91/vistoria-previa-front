import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';

import { CalendarBrModule } from '../../directive/calendar-br.directive';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { CorretorService } from '../../service/corretor-service';
import { RelatorioService } from '../../service/relatorio-service';
import { RelatorioImprodutivoConsultarComponent } from './relatorio-improdutivo/relatorio-improdutivo-consultar/relatorio-improdutivo-consultar.component';
import { RelatorioImprodutivoVisualizarComponent } from './relatorio-improdutivo/relatorio-improdutivo-visualizar/relatorio-improdutivo-visualizar.component';
import { RelatorioImprodutivoDetalheComponent } from './relatorio-improdutivo/relatorio-improdutivo-detalhe/relatorio-improdutivo-detalhe.component';
import { AgendamentosRejeitadosFrustradosComponent } from './agendamentos-rejeitados-frustrados/agendamentos-rejeitados-frustrados.component';
import { RelatorioAgendamentoService } from '../../service/relatorio-agendamentos.service';
import { LaudoVistoriaModule } from '../laudo-vistoria/laudo-vistoria-module/laudo-vistoria.module';
import { HistoricoAgendamentosComponent } from './historico-agendamentos/historico-agendamentos.component';
import { SituacaoAgendamentosComponent } from './situacao-agendamentos/situacao-agendamentos.component';
import { AgendamentosStatusLocalComponent } from './agendamentos-status-local/agendamentos-status-local.component';
import { CommonUtilsModule } from '../common-utils/common-utils.module';


@NgModule({
  declarations: [
    RelatorioImprodutivoConsultarComponent, 
    RelatorioImprodutivoVisualizarComponent, 
    RelatorioImprodutivoDetalheComponent,
    AgendamentosRejeitadosFrustradosComponent,
    SituacaoAgendamentosComponent,
    HistoricoAgendamentosComponent,
    AgendamentosStatusLocalComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RelatorioRoutingModule,

    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    FieldsetModule,
    InputTextareaModule,
    InputTextModule,
    PanelModule,
    RadioButtonModule,
    TableModule,

    LaudoVistoriaModule,
    CalendarBrModule,

    CommonUtilsModule
    
  ],
  providers: [
    CorretorService,
    RelatorioService,
    RelatorioAgendamentoService,
    DatePipe
  ]
})
export class RelatorioModule { }
