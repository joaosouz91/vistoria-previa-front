import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrestadoraComponent } from '../prestadora-consultar/prestadora.component';
import { PrestadoraEditarComponent } from '../prestadora-editar/prestadora-editar.component';


const routes: Routes = [
  { path: '', component: PrestadoraComponent },
  { path: 'novo', component: PrestadoraEditarComponent },
  { path: ':codigoPrestadora', component: PrestadoraEditarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestadoraRoutingModule { }
