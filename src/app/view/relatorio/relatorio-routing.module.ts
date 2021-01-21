import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentosRejeitadosFrustradosComponent } from './agendamentos-rejeitados-frustrados/agendamentos-rejeitados-frustrados.component';
import { AgendamentosStatusLocalComponent } from './agendamentos-status-local/agendamentos-status-local.component';
import { HistoricoAgendamentosComponent } from './historico-agendamentos/historico-agendamentos.component';
import { RelatorioImprodutivoConsultarComponent } from './relatorio-improdutivo/relatorio-improdutivo-consultar/relatorio-improdutivo-consultar.component';
import { RelatorioImprodutivoDetalheComponent } from './relatorio-improdutivo/relatorio-improdutivo-detalhe/relatorio-improdutivo-detalhe.component';
import { SituacaoAgendamentosComponent } from './situacao-agendamentos/situacao-agendamentos.component';

const routes: Routes = [
    { 
        path: 'improdutivo', component: RelatorioImprodutivoConsultarComponent
    },
    { 
        path: 'improdutivo/lote/:id', component: RelatorioImprodutivoDetalheComponent
    },
    { 
        path: 'agendamentos-rejeitados-frustrados', component: AgendamentosRejeitadosFrustradosComponent
    },
    { 
        path: 'situacao-agendamentos', component: SituacaoAgendamentosComponent
    },
    { 
        path: 'historico-agendamentos', component: HistoricoAgendamentosComponent
    },
    { 
        path: 'agendamentos-status-local', component: AgendamentosStatusLocalComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }
