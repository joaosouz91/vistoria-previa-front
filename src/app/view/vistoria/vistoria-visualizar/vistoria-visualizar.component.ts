import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgendamentoService } from '../agendamento.service';
import { Agendamento } from '../model/agendamento';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-vistoria-visualizar',
  templateUrl: './vistoria-visualizar.component.html',
  styleUrls: ['./vistoria-visualizar.component.css']
})
export class VistoriaVisualizarComponent implements OnInit {

  id: number;
  voucher: string;
  agendamento: Agendamento;

  constructor(private activatedRoute: ActivatedRoute, private agendamentoService: AgendamentoService) {
    this.agendamento = new Agendamento();
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.voucher = this.activatedRoute.snapshot.paramMap.get('voucher');
  }

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.agendamentoService.obterVistoriaPorVoucher(this.voucher, this.id)
    .pipe(take(1)).subscribe(response => {
      this.agendamento = response;
    });
  }

}
