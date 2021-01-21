import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




import { DispensaComponent } from './dispensar.component';

const routes: Routes = [
  { path: ':codigoProposta/:numeroItemSegurado/:tipoFechamentoRestricao', component: DispensaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispensaRoutingModule { }
