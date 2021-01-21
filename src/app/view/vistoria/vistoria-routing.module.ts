import { NgModule } from '@angular/core';
import { VistoriaComponent } from './vistoria-consultar/vistoria.component';
import { Routes, RouterModule } from '@angular/router';
import { VistoriaVisualizarComponent } from './vistoria-visualizar/vistoria-visualizar.component';
import { VistoriaAgendarComponent } from './vistoria-agendar/vistoria-agendar.component';
import { AgendamentoSantanderComponent } from './agendamento/agendamento-santander/agendamento-santander.component';
import { LaudosTransmitidosConsultaComponent } from './laudos-transmitidos-consulta/laudos-transmitidos-consulta.component';
import { LaudosTransmitidosDetalheComponent } from './laudos-transmitidos-detalhe/laudos-transmitidos-detalhe.component';
import { LaudosTransmitidosInconsistenciaComponent } from './laudos-transmitidos-inconsistencias/laudos-transmitidos-inconsistencias.component';

const routes: Routes = [
  { path: '', component: VistoriaComponent },
  { path: ':id/agendamento/:voucher', component: VistoriaVisualizarComponent },
  { path: ':id/agendamento', component: VistoriaAgendarComponent },
  { path: 'agendamento/santander', component: AgendamentoSantanderComponent },
  { path: 'agendamento/santander/:cotacao', component: AgendamentoSantanderComponent },
  { path: 'laudos-transmitidos', component: LaudosTransmitidosConsultaComponent },
  { path: 'laudos-transmitidos/:idRecepcaoLaudo', component: LaudosTransmitidosDetalheComponent },
  { path: 'laudos-transmitidos/:idRecepcaoLaudo/inconsistencias', component: LaudosTransmitidosInconsistenciaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistoriaRoutingModule { }
