import { Component, OnInit } from '@angular/core';
import { Vistoria } from '../../model/vistoria';
import { MessageUtil } from '../../../../service/message-util.service';
import { AgendamentoService } from '../../agendamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendamento-santander',
  templateUrl: './agendamento-santander.component.html',
  styleUrls: ['./agendamento-santander.component.css']
})
export class AgendamentoSantanderComponent implements OnInit {

  constructor(private message: MessageUtil, private agendamentoService: AgendamentoService, private route: Router) { }

  cotacao: number;
  vistoria: Vistoria;

  ngOnInit() {
  }

  pesquisar() {
    this.vistoria = null;
    if (this.cotacao) {
      this.agendamentoService.obterVistoriaPorCotacao(this.cotacao).subscribe(v => this.vistoria = v);
    } else {
      this.message.errorInline('Numero Cotacao não informado.');
    }
  }

  gravar() {
    this.agendamentoService.gravarPreAgendamento(this.cotacao, this.vistoria)
      .subscribe(resp => this.route.navigate(['vistoria', resp.id, 'agendamento']));
  }

  cancelar() {
    this.cotacao = null;
    this.vistoria = null;
  }
}
