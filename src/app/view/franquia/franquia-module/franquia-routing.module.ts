import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { FranquiaComponent } from '../franquia-consultar/franquia.component';
import { FranquiaEditarComponent } from '../franquia-editar/franquia-editar.component';

const routes: Routes = [
  { path: '', component: FranquiaComponent },
  { path: 'novo', component: FranquiaEditarComponent },
  { path: ':codigoFranquia', component: FranquiaEditarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranquiaRoutingModule { }
