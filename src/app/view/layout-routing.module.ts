import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'vistoria',
        loadChildren: () => import('./vistoria/vistoria.module').then(m => m.VistoriaModule)
      },
      {
        path: 'prestadora',
        loadChildren: () => import('./prestadora/prestadora-module/prestadora.module').then(m => m.PrestadoraModule)
      },
      {
        path: 'dispensar',
        loadChildren: () => import('./dispensa/dispensa.module').then(m => m.DispensaModule)
      },
      {
        path: 'divergencia',
        loadChildren: () => import('./divergencia/divergencia.module').then(m => m.DivergenciaModule)
      },
      {
        path: 'laudo-vistoria',
        loadChildren: () => import('./laudo-vistoria/laudo-vistoria-module/laudo-vistoria.module').then(m => m.LaudoVistoriaModule)
      },
      {
        path: 'reclassificacao',
        loadChildren: () => import('./reclassificacao/reclassificacao.module').then(m => m.ReclassificacaoModule)
      },
      {
        path: 'franquia',
        loadChildren: () => import('./franquia/franquia-module/franquia.module').then(m => m.FranquiaModule)
      },
      {
        path: 'posto',
        loadChildren: () => import('./posto/posto-module/posto.module').then(m => m.PostoModule)
      },
      { 
        path: 'restricao-visualizar', 
        loadChildren: () => import('./restricao/restricao.module').then(m => m.RestricaoModule) 
      }, 
      {
        path: 'parametro',
        loadChildren: () => import('./parametro/parametro.module').then(m => m.ParametroModule)
      },
      {
        path : 'relatorio',
        loadChildren : () => import('./relatorio/relatorio.module').then(m => m.RelatorioModule)
      },
      {
        path : 'estatistica',
        loadChildren : () => import('./estatistica/estatistica.module').then(m => m.EstatisticaModule)
      },
      { 
        path: '**', 
        loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
