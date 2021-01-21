import { Component, OnInit, Input } from '@angular/core';
import { VistoriaFrotaService } from './vistoria-frota.service';
import { Vistoria } from '../../model/vistoria';

@Component({
  selector: 'app-vistoria-frota',
  templateUrl: './vistoria-frota.component.html',
  styleUrls: ['./vistoria-frota.component.css']
})
export class VistoriaFrotaComponent implements OnInit {

  constructor(public vistoriaFrotaService: VistoriaFrotaService) { }

  ngOnInit() {
  }

  onRowSelect(event) {
    if (event.checked) {
      this.vistoriaFrotaService.itensFrotaSelecionados = this.vistoriaFrotaService.frota.filter(i => !this.disabled(i));
    } else {
      this.vistoriaFrotaService.itensFrotaSelecionados = [];
    }
  }

  disabled(item: Vistoria) {
    if (item.links && item.links.find(l => l.title == 'agendar')) {
      return false;
    }

    return true;
  }
}
