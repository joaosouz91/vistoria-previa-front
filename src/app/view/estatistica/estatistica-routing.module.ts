import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtrasosTransmissaoConsultaComponent } from './atrasos-transmissao-consulta/atrasos-transmissao-consulta.component';
import { AtrasosTransmissaoDetalheTotalComponent } from './atrasos-transmissao-detalhe-total/atrasos-transmissao-detalhe-total.component';
import { AtrasosTransmissaoDetalheComponent } from './atrasos-transmissao-detalhe/atrasos-transmissao-detalhe.component';
import { AtrasosTransmissaoResultadoComponent } from './atrasos-transmissao-resultado/atrasos-transmissao-resultado.component';
import { RelatorioFaturamentoConsultaComponent } from './relatorio-faturamento-consulta/relatorio-faturamento-consulta.component';
import { RelatorioFaturamentoDetalheComponent } from './relatorio-faturamento-detalhe/relatorio-faturamento-detalhe.component';
import { RelatorioFaturamentoResultadoComponent } from './relatorio-faturamento-resultado/relatorio-faturamento-resultado.component';

import { VistoriasRealizadasConsultaComponent } from './vistorias-realizadas-consulta/vistorias-realizadas-consulta.component';
import { VistoriasRealizadasDetalheComponent } from './vistorias-realizadas-detalhe/vistorias-realizadas-detalhe.component';
import { VistoriasRealizadasResultadoComponent } from './vistorias-realizadas-resultado/vistorias-realizadas-resultado.component';

const routes: Routes = [

    /* Vistorias Realizadas */
    {
        path: 'vistorias-realizadas', component: VistoriasRealizadasConsultaComponent},
    {
        path: 'vistorias-realizadas-resultado', component: VistoriasRealizadasResultadoComponent
    },
    {
        path: 'vistorias-realizadas-detalhe', component: VistoriasRealizadasDetalheComponent
    },

    /* Atrasos Transmissão */
    {
        path: 'atrasos-transmissao', component: AtrasosTransmissaoConsultaComponent
    },
    {
        path: 'atrasos-transmissao-resultado', component: AtrasosTransmissaoResultadoComponent
    },
    {
        path: 'atrasos-transmissao-detalhe', component: AtrasosTransmissaoDetalheComponent
    },
    {
        path: 'atrasos-transmissao-detalhe-total', component: AtrasosTransmissaoDetalheTotalComponent
    },

    /* Relatório Faturamento */
    {
        path: 'relatorio-faturamento', component: RelatorioFaturamentoConsultaComponent
    },
    {
        path: 'relatorio-faturamento-resultado', component: RelatorioFaturamentoResultadoComponent
    },
    {
        path: 'relatorio-faturamento-detalhe', component: RelatorioFaturamentoDetalheComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EstatisticaRoutingModule { }
