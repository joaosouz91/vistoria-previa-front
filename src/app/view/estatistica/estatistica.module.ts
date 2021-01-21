import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstatisticaRoutingModule } from './estatistica-routing.module';
import { VistoriasRealizadasConsultaComponent } from './vistorias-realizadas-consulta/vistorias-realizadas-consulta.component';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EstatisticaService } from './estatistica.service';
import { VistoriasRealizadasResultadoComponent } from './vistorias-realizadas-resultado/vistorias-realizadas-resultado.component';
import { PrestadoraVistoriaService } from '../prestadora/prestadora-module/prestadora-vistoria-service';
import { VistoriasRealizadasDetalheComponent } from './vistorias-realizadas-detalhe/vistorias-realizadas-detalhe.component';
import { AtrasosTransmissaoConsultaComponent } from './atrasos-transmissao-consulta/atrasos-transmissao-consulta.component';
import { AtrasosTransmissaoResultadoComponent } from './atrasos-transmissao-resultado/atrasos-transmissao-resultado.component';
import { AtrasosTransmissaoDetalheComponent } from './atrasos-transmissao-detalhe/atrasos-transmissao-detalhe.component';
import { AtrasosTransmissaoDetalheTotalComponent } from './atrasos-transmissao-detalhe-total/atrasos-transmissao-detalhe-total.component';
import { RelatorioFaturamentoConsultaComponent } from './relatorio-faturamento-consulta/relatorio-faturamento-consulta.component';
import { RelatorioFaturamentoResultadoComponent } from './relatorio-faturamento-resultado/relatorio-faturamento-resultado.component';
import { RelatorioFaturamentoDetalheComponent } from './relatorio-faturamento-detalhe/relatorio-faturamento-detalhe.component';
import { CommonUtilsModule } from '../common-utils/common-utils.module';

@NgModule({
  declarations: [
    VistoriasRealizadasConsultaComponent,
    VistoriasRealizadasResultadoComponent,
    VistoriasRealizadasDetalheComponent,
    AtrasosTransmissaoConsultaComponent,
    AtrasosTransmissaoResultadoComponent,
    AtrasosTransmissaoDetalheComponent,
    AtrasosTransmissaoDetalheTotalComponent,
    RelatorioFaturamentoConsultaComponent,
    RelatorioFaturamentoResultadoComponent,
    RelatorioFaturamentoDetalheComponent
  ],
  imports: [
    CommonModule,
    EstatisticaRoutingModule,
    FormsModule,
    PanelModule,
    DropdownModule,
    ButtonModule,
    InputTextareaModule,
    TableModule,
    CommonUtilsModule
  ],
  providers: [
    EstatisticaService, 
    PrestadoraVistoriaService
  ]
})
export class EstatisticaModule { }
