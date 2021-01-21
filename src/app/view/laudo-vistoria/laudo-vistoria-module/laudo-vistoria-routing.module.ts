import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LaudoVistoriaComponent } from "../laudo-consultar/laudo-vistoria.component";
import { LaudoEditarComponent } from '../laudo-editar/laudo-editar.component';
import { LaudoVisualizarComponent } from '../laudo-visualizar/laudo-visualizar.component';


const routes: Routes = [
  { path: '', component: LaudoVistoriaComponent },
  { path: 'editar/:codigoLaudo', component: LaudoEditarComponent },
  { path: 'visualizar/:codigoLaudo', component: LaudoVisualizarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaudoVistoriaRoutingModule { }
