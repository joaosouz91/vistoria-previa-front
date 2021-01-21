import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestricaoVisualizarComponent } from './restricao-visualizar.component';

const routes: Routes = [
  { path: ':codigoProposta/:numeroItemSegurado', component: RestricaoVisualizarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestricaoRoutingModule { }
