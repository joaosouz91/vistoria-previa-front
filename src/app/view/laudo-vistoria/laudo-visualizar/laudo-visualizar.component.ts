import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-laudo-visualizar',
  templateUrl: './laudo-visualizar.component.html'
})
export class LaudoVisualizarComponent implements OnInit {

  CODIGO_LVPRE: string;
  filtroLaudo: any;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.CODIGO_LVPRE = this.activatedRoute.snapshot.paramMap.get('codigoLaudo');
  }

  ngOnInit() {
    this.filtroLaudo = history.state.filtroLaudo;
  }
}
