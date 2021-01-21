import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MessageUtil } from '../../../../service/message-util.service';
import { RelatorioService } from '../../../../service/relatorio-service';
import { LoteLaudoImprodutivoAux } from '../../../../model/relatorio/lote-laudo-improdutivo-aux';
import { RelatorioImprodutividade } from '../../../../model/relatorio/relatorio-improdutividade';

@Component({
  selector: 'app-relatorio-improdutivo-visualizar',
  templateUrl: './relatorio-improdutivo-visualizar.component.html',
  styleUrls: ['./relatorio-improdutivo-visualizar.component.css']
})
export class RelatorioImprodutivoVisualizarComponent implements OnInit, OnChanges {

  constructor(
    private router: Router,
    private relatorioService: RelatorioService,
    private messageUtil: MessageUtil
  ) { }

  @Input() filtroRelatorio: any;
  @Input() relatorio: RelatorioImprodutividade;

  @Output() voltar = new EventEmitter();

  selectedLotes: LoteLaudoImprodutivoAux[];
  dialogTransmitir = false;

  ngOnInit(): void {
    if (this.relatorio) {
      const lotes = this.relatorio.listaLoteImprodutivoAux;
      if (lotes) {
        this.selectedLotes = lotes.filter(el => el.loteLaudoImprodutivo.icExclu == 'S');
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['relatorio']) {
      this.ngOnInit();
    }
  }

  exibirDetalheCorretor(id: number): void {
    this.router.navigate([`/relatorio/improdutivo/lote/${id}`], { state: { filtroRelatorio: this.filtroRelatorio } });
  }

  transmitirLotes(): void {
    this.atualizarIcExclu();
    this.relatorioService.transmitirLotes(this.relatorio)
      .subscribe(
        () => this.messageUtil.success(`Lotes de ${this.relatorio.descricaoDataReferencia} transmitidos com sucesso.`),
        err => this.messageUtil.error(`Falha na transmissão dos lotes para o Acselx. ${err.error.message}`)
      );
  }

  salvarLotes(): void {
    this.atualizarIcExclu();
    this.relatorioService.salvarLotes(this.relatorio)
      .subscribe(() => this.messageUtil.success('Lotes alterados com sucesso.'));
  }

  private atualizarIcExclu(): void {
    if (this.selectedLotes?.length > 0) {

      this.selectedLotes.forEach(s => {
        const idx = this.relatorio.listaLoteImprodutivoAux
          .findIndex(aux => aux.loteLaudoImprodutivo.idLoteLaudoImpdv == s.loteLaudoImprodutivo.idLoteLaudoImpdv);

        if (idx >= 0) {
          this.relatorio.listaLoteImprodutivoAux[idx].loteLaudoImprodutivo.icExclu = 'S';
        }
      });

    } else {
      this.relatorio.listaLoteImprodutivoAux.forEach(aux => aux.loteLaudoImprodutivo.icExclu = 'N');
    }
  }
}
