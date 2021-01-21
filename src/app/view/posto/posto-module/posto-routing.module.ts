import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostoComponent } from '../posto-consultar/posto.component';
import { PostoEditarComponent } from '../posto-editar/posto-editar.component';


const routes: Routes = [
  { path: '', component: PostoComponent },
  { path: 'prestadora/:codigoPrestadora', component: PostoComponent },
  { path: ':codigoPosto/prestadora/:codigoPrestadora', component: PostoEditarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostoRoutingModule { }
