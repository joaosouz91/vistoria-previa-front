import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { DivergenciaComponent } from './divergencia.component';

const routes: Routes = [
  { 
    path: ':codigoProposta/:numeroItemSegurado/:tipoFechamentoRestricao', component: DivergenciaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DivergenciaRoutingModule { }
