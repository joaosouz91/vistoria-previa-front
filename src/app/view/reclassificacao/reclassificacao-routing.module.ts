import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReclassificacaoComponent } from './reclassificacao.component';

const routes: Routes = [
  { path: ':codigoProposta/:numeroItemSegurado/:tipoFechamentoRestricao', component: ReclassificacaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclassificacaoRoutingModule { }
