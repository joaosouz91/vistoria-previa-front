import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessoriosCrudComponent } from './acessorios/acessorios-crud.component';
import { AvariasCrudComponent } from './avarias/avarias-crud.component';
import { MotivoDispensaCrudComponent } from './motivos-dispensa/motivos-dispensa-crud.component';
import { PecasCrudComponent } from './pecas/pecas-crud.component';
import { RegiaoTarifariaComponent } from './regiao-tarifaria/regiao-tarifaria.component';

const routes: Routes = [
  { path: 'regiao-tarifaria', component: RegiaoTarifariaComponent },
  { path: 'pecas', component: PecasCrudComponent },
  { path: 'avarias', component: AvariasCrudComponent },
  { path: 'motivos-dispensa', component: MotivoDispensaCrudComponent },
  { path: 'acessorios', component: AcessoriosCrudComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametroRoutingModule { }
