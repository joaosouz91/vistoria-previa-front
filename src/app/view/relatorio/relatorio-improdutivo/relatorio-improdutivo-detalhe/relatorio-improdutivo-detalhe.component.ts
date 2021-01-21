import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageUtil } from '../../../../service/message-util.service';
import { LoteLaudoImprodutivoAux } from '../../../../model/relatorio/lote-laudo-improdutivo-aux';
import { LoteLaudoImprodutivoDetalheAux } from '../../../../model/relatorio/lote-laudo-improdutivo-detalhe-aux';
import { RelatorioImprodutividadeCorretor } from '../../../../model/relatorio/relatorio-improdutividade-corretor';
import { RelatorioService } from '../../../../service/relatorio-service';
import { LaudoVisualizarDialogComponent } from '../../../laudo-vistoria/laudo-visualizar-dialog/laudo-visualizar-dialog.component';

@Component({
  selector: 'app-relatorio-improdutivo-detalhe',
  templateUrl: './relatorio-improdutivo-detalhe.component.html',
  styleUrls: ['./relatorio-improdutivo-detalhe.component.css'],
  providers: [DialogService]
})
export class RelatorioImprodutivoDetalheComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private relatorioService: RelatorioService,
    private messageUtil: MessageUtil,
    private dialogService: DialogService
  ) { }

  id: number;
  relatorio: RelatorioImprodutividadeCorretor;
  loteImprodutivoAux: LoteLaudoImprodutivoAux;
  listaLoteDetalheAdicional: LoteLaudoImprodutivoDetalheAux[];
  dsMotvLaudoImpdv: string;

  listaPesquisaLaudoAdicional: LoteLaudoImprodutivoDetalheAux[];
  selectedLotesAdicionais: LoteLaudoImprodutivoDetalheAux[];
  selectedListaLoteDetalhe: LoteLaudoImprodutivoDetalheAux[];

  formPesquisaLaudoAdicional: FormGroup;

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");

    this.obterRelatorioImprodutivoPorId();
  }

  buildFormPesquisaLaudoAdicional(): void {
    this.formPesquisaLaudoAdicional = this.fb.group({
      corretor: this.loteImprodutivoAux.loteLaudoImprodutivo.cdCrtorSegur,
      dataReferencia: [null, Validators.required],
      laudo: [null],
      voucher: [null]
    });
  }

  private obterRelatorioImprodutivoPorId(): void {
    this.relatorioService.getRelatorioImprodutivoPorId(this.id).subscribe(
      resp => {
        this.relatorio = resp;
        this.loteImprodutivoAux = this.relatorio.loteImprodutivoAux;

        this.selectedListaLoteDetalhe = [];
        this.loteImprodutivoAux.listaLoteDetalhe.forEach(el => {
          if (el.loteLaudoImprodutivoDetalhe.icExclu === 'S') {
            this.selectedListaLoteDetalhe.push(el);
          }
        });

        this.listaLoteDetalheAdicional = this.loteImprodutivoAux.listaLoteDetalheAdicional;
        this.dsMotvLaudoImpdv = this.loteImprodutivoAux.loteLaudoImprodutivo.dsMotvLaudoImpdv;
      }
    );
  }

  retirar(event, index): void {
    this.loteImprodutivoAux.listaLoteDetalhe[index].loteLaudoImprodutivoDetalhe.icExclu = event.checked ? 'S' : 'N';
  }

  incluirLaudo(event, index): void {
    this.listaPesquisaLaudoAdicional[index].adicionarLaudo = event.checked ? 'S' : 'N';
  }

  onSubmitPesquisaLaudoAdicional(): void {
    this.relatorioService
      .getLaudosAdicionais(this.formPesquisaLaudoAdicional.value)
      .subscribe(resp => {
        this.listaPesquisaLaudoAdicional = resp;

        if (!(this.listaPesquisaLaudoAdicional?.length > 0)) {
          this.messageUtil.warn('Não há laudos para serem exibidos.');
        }
      });
  }

  exibirPesquisaAdicional(): void {
    this.buildFormPesquisaLaudoAdicional();
    this.relatorio.exibirPesquisaAdicional = true;
  }

  cancelarPesquisaAdicional(): void {
    this.relatorio.exibirPesquisaAdicional = false;
    this.formPesquisaLaudoAdicional.reset();
    this.listaPesquisaLaudoAdicional = null;
  }

  private adicionarLoteAdicional(): void {
    if (!this.listaLoteDetalheAdicional) {
      this.listaLoteDetalheAdicional = [];
    }

    this.selectedLotesAdicionais
      .filter(el => this.listaLoteDetalheAdicional.
        findIndex(d => d.loteLaudoImprodutivoDetalhe.idLoteLaudoImpdvDetal
          == el.loteLaudoImprodutivoDetalhe.idLoteLaudoImpdvDetal) < 0)
      .forEach(el => {
        el.adicionarLaudo = 'S';
        this.listaLoteDetalheAdicional.push(el);
      });

    this.selectedLotesAdicionais = null;
  }

  btnAdicionarLoteAdicional(): void {
    this.adicionarLoteAdicional();
    this.calcularDetalheLote();
    this.cancelarPesquisaAdicional();
  }

  private removerLoteAdicional(): void {
    if (!this.listaLoteDetalheAdicional) {
      this.listaLoteDetalheAdicional = [];
    }

    this.selectedLotesAdicionais.forEach(el => {
      const index = this.listaLoteDetalheAdicional.
        findIndex(d => d.loteLaudoImprodutivoDetalhe.idLoteLaudoImpdvDetal
          == el.loteLaudoImprodutivoDetalhe.idLoteLaudoImpdvDetal);

      if (index >= 0) {
        this.listaLoteDetalheAdicional.splice(index, 1);
      }
    });

    this.selectedLotesAdicionais = null;
  }

  private removerListaLoteDetalhe(): void {
    if (this.selectedListaLoteDetalhe?.length > 0) {

      this.selectedListaLoteDetalhe.forEach(el => {
        const index = this.loteImprodutivoAux.listaLoteDetalhe.
          findIndex(d => d.loteLaudoImprodutivoDetalhe.idLoteLaudoImpdvDetal
            == el.loteLaudoImprodutivoDetalhe.idLoteLaudoImpdvDetal);

        if (index >= 0) {
          this.loteImprodutivoAux.listaLoteDetalhe[index].loteLaudoImprodutivoDetalhe.icExclu = 'S';
        }
      });
    } else {
      this.loteImprodutivoAux.listaLoteDetalhe.forEach(el => el.loteLaudoImprodutivoDetalhe.icExclu = 'N');
    }
  }

  btnRemoverLoteAdicional(): void {
    this.removerLoteAdicional();
    this.calcularDetalheLote();
  }

  cancelar(): void {
    this.relatorio = null;
    this.loteImprodutivoAux = null;
    this.listaLoteDetalheAdicional = null;
    this.selectedListaLoteDetalhe = null;
    this.listaPesquisaLaudoAdicional = null;
    this.dsMotvLaudoImpdv = null;
    this.formPesquisaLaudoAdicional = null;

    this.ngOnInit();
  }

  voltar(): void {
    this.router.navigate([`/relatorio/improdutivo`], { state: { filtroRelatorio: history.state.filtroRelatorio } });
  }

  calcularDetalheLote(): void {
    if (this.selectedLotesAdicionais?.length > 0) {
      if (this.relatorio.exibirPesquisaAdicional) {
        this.adicionarLoteAdicional();
      } else {
        this.removerLoteAdicional();
      }
    }

    this.removerListaLoteDetalhe();

    this.relatorioService.calcularDetalheLote(this.relatorio, this.loteImprodutivoAux, this.listaLoteDetalheAdicional);
  }

  btnCalcularDetalheLote(): void {
    this.calcularDetalheLote();
    this.messageUtil.success('Lote calculado com sucesso.')
  }

  salvarDetalheLote(): void {
    this.loteImprodutivoAux.listaLoteDetalheAdicional = this.listaLoteDetalheAdicional;
    this.loteImprodutivoAux.loteLaudoImprodutivo.dsMotvLaudoImpdv = this.dsMotvLaudoImpdv;
    this.relatorio.loteImprodutivoAux = this.loteImprodutivoAux;

    this.calcularDetalheLote();
    this.relatorioService.salvarDetalheLote(this.id, this.relatorio).subscribe(
      () => this.messageUtil.success('Lote alterado com sucesso.')
    );
  }

  showLaudo(cdLaudo: string) {
    this.dialogService.open(LaudoVisualizarDialogComponent, {
      data: {
        id: cdLaudo
      },
      header: 'Laudo Vistoria',
      width: '90%'
    });
  }
}
