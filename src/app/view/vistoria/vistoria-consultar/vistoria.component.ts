import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltroAgendamento } from '../model/filtro-agendamento';
import { VistoriaService } from '../vistoria.service';
import { Vistoria } from '../model/vistoria';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { UtilsService } from '../../../service/utils.service';
import { MessageUtil } from '../../../service/message-util.service';
import { AgendamentoService } from '../agendamento.service';
import { map, take } from 'rxjs/operators';
import { SelectItem } from 'primeng/api/selectitem';
import { UsuarioService } from '../../../service/usuario.service';
import { Usuario } from '../../../model/usuario';

@Component({
  selector: 'app-vistoria',
  templateUrl: './vistoria.component.html',
  styleUrls: ['./vistoria.component.css']
})
export class VistoriaComponent implements OnInit {
  @ViewChild('dt') table: Table;

  vistorias: Vistoria[];
  periodo: Date[];
  situacoes: SelectItem[];
  motivosCancelamento: any[];
  voucherSelecionado: string;
  motivoCancelamento: number;
  observacaoCancelamento = 'Agendamento cancelado manualmente por colaborador Tokio';
  displayMotivoCancelamento = false;
  filtro: FiltroAgendamento;
  usuario: Usuario;
  constructor(
    private vistoriaService: VistoriaService,
    private agendamentoService: AgendamentoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private utilsService: UtilsService,
    private messageService: MessageUtil) {
  }

  ngOnInit() {
    this.usuarioService.obterUsuario()
    .subscribe(user => {
      this.usuario = user;
      if (this.usuario.web){
        this.filtro.corretor = user.dadosPerfil.codigoInterno;
      }
    });

    this.agendamentoService.getSituacoesAgendamento()
      .pipe(
        map(s => s.map(element => <SelectItem>{ label: element.descricao, value: element.value })),
        take(1))
      .subscribe(s => this.situacoes = s);

    let dateDe = new Date();
    dateDe.setDate(dateDe.getDate() - 30);
    this.periodo = [dateDe, new Date()];

    this.addFiltroSession();
  }

  addFiltroSession() {
    this.filtro = this.vistoriaService.getUltimoFiltro();
    if (this.filtro) {
      if (this.filtro.dataDe && this.filtro.dataAte) {
        this.periodo = [this.filtro.dataDe, this.filtro.dataAte];
      } else {
        this.periodo = null;
      }

      this.pesquisar();
    } else {
      this.filtro = new FiltroAgendamento();
    }
  }

  pesquisar() {
    if (this.table) {
      this.table.reset();
    }

    this.vistorias = [];

    if (this.periodo) {
      this.filtro.dataDe = this.periodo[0];
      this.filtro.dataAte = this.periodo[1];
    } else {
      this.filtro.dataDe = null;
      this.filtro.dataAte = null;
    }

    this.vistoriaService.pesquisarVistorias(this.filtro)
      .pipe(take(1))
      .subscribe(
        response => {
          this.vistorias = response;
          if (!this.vistorias || this.vistorias.length == 0) {
            this.messageService.warnInline("Nenhum registro encontrado para os dados informados.");
          }
        }
      );
  }

  visualizar(vistoria: Vistoria) {
    this.router.navigate([`/vistoria/${vistoria.id}/agendamento/${vistoria.agendamento.voucher}`]);
  }

  agendar(vistoria: Vistoria) {
    this.agendamentoService.isPermiteVistoria(vistoria.id).pipe(take(1)).subscribe(
      () => this.router.navigate([`/vistoria/${vistoria.id}/agendamento`])
    );
  }

  saveVistoria(vistoria: Vistoria) {
    let vpo = {...vistoria};
    vpo.tipoVeiculo = vistoria.tipoVeiculo.valor;
    this.vistoriaService.save(vpo).subscribe(resp => {
      this.agendar(resp);
    });
    }

  confirmarCancelamento(vistoria: Vistoria) {
    this.motivoCancelamento = null;
    this.voucherSelecionado = vistoria.agendamento.voucher;
    this.utilsService.obterMotivosCancelamento(vistoria.agendamento.tipo.codigo)
      .pipe(take(1)).subscribe(
        response => {
          this.motivosCancelamento = response;
          this.displayMotivoCancelamento = true;
        }
      );
  }

  cancelar() {
    if (this.motivoCancelamento) {
      this.agendamentoService.cancelar(this.voucherSelecionado, { codigoMotivo: this.motivoCancelamento, descricaoMotivo: this.observacaoCancelamento })
        .pipe(take(1)).subscribe(
          () => {
            this.messageService.successInline(`Agendamento com voucher ${this.voucherSelecionado} cancelado com sucesso.`);
            this.displayMotivoCancelamento = false;
            this.pesquisar();
          });
    } else {
      this.messageService.warn("Informe o motivo do cancelamento.");
    }
  }
}