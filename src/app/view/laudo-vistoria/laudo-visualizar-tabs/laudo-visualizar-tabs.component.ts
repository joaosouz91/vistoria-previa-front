import { Component, Input, OnInit } from '@angular/core';
import { CarroceriaService } from '../../../service/carroceria-service';
import { ComboService } from '../../../service/combos-services';
import { PrestadoraVistoriaService } from '../../prestadora/prestadora-module/prestadora-vistoria-service';
import { MessageUtil } from '../../../service/message-util.service';
import { LaudoVistoriaService } from '../laudo-vistoria-module/laudo-vistoria-service';
import { LaudoFull } from '../model/laudo-full';
import { LaudoVistoria } from '../model/laudo-vistoria';
import { Veiculo } from '../model/veiculo';
import { Proponente } from '../model/proponente';
import { Corretor } from '../../../model/corretor';
import { CorretorService } from '../../../service/corretor-service';
import { take, toArray } from 'rxjs/operators';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-laudo-visualizar-tabs',
  templateUrl: './laudo-visualizar-tabs.component.html',
  styleUrls: ['./laudo-visualizar-tabs.component.css']
})
export class LaudoVisualizarTabsComponent implements OnInit {

  @Input() codigoLaudo: string;

  pt: any;
  situacao: SelectItem[] = [{ label: 'Vinculado', value: 'S' }, { label: 'Não Vinculado', value: 'N' }];
  estadoCivil: SelectItem[];
  laudofull: LaudoFull;
  prestadoras: SelectItem[] = [];
  finalidades: SelectItem[] = [];
  ecs: SelectItem[];
  statusLaudo: SelectItem[];
  carrocerias: SelectItem[];
  tipoCabine: SelectItem[];
  tiposeguro: SelectItem[];
  tpSegur: Array<any>;
  ufs: SelectItem[];
  habilitado: boolean;
  corretorFiltro: Corretor;
  nomeCorretor: string;

  constructor(
    private laudoService: LaudoVistoriaService,
    private messageService: MessageUtil,
    private prestadoraService: PrestadoraVistoriaService,
    private combos: ComboService,
    private carroceriaService: CarroceriaService,
    private corretorService: CorretorService
  ) {

    this.laudofull = new LaudoFull;
    this.laudofull.laudo = new LaudoVistoria;
    this.laudofull.veiculo = new Veiculo;
    this.laudofull.proponente = new Proponente;
    this.laudofull.acessorios = new Array<any>();

    this.corretorFiltro = new Corretor;
  }

  ngOnInit() {
    this.laudofull.CODIGO_LVPRE = this.codigoLaudo;
    this.buscarLaudoDadosBasicos();
  }

  buscarLaudoDadosBasicos() {
    this.laudoService.obterLaudo(this.laudofull.CODIGO_LVPRE).pipe(take(1)).subscribe(
      response => {
        this.laudofull = response;
        this.obterCorretor(this.laudofull.laudo.CODIGO_CORRETOR_SEGURADO);
        this.carregaModeloFabricantes();

        this.carregaPrestadoras();
        this.carregaFabricante();
        this.carregarCarrocerias();
      },
      error => {
        if (error.status == 400) {
          this.messageService.error('Erro ao buscar dados básicos do laudo!');
        } else {
          this.messageService.error('Servidor não encontrado!');
        }
      }
    );
  }

  obterCorretor(codigo: number) {
    this.corretorFiltro.idCorretor = codigo;
    this.corretorService.postPesquisaCorretor(this.corretorFiltro).pipe(take(1)).subscribe(
      response => {
        this.nomeCorretor = response[0].nomeCorretor;
      },
      error => {
        if (error.status == 400) {
          this.messageService.error('Erro ao buscar Corretor!');
        } else {
          this.messageService.error('Servidor não encontrado!');
        }
      }
    );
  }

  carregaPrestadoras() {
    if (this.laudofull?.laudo?.CODIGO_EMPRESA_VISTORIA) {
      this.prestadoraService.getPrestadoraVistoria(this.laudofull.laudo.CODIGO_EMPRESA_VISTORIA)
        .pipe(take(1)).subscribe(
          resp => this.laudofull.laudo.NOME_EMPRESA_VISTORIA = resp.razaoSocial
        );
    }
  }

  carregaFabricante() {
    this.combos.obterFabricante(this.laudofull.veiculo.codigo_fabricante).pipe(take(1)).subscribe(
      response => this.laudofull.veiculo.nome_fabricante = response.descricao
    );
  }

  carregaModeloFabricantes() {
    this.combos.obterModelo(this.laudofull.veiculo.codigo_fabricante, this.laudofull.veiculo.codigo_modelo_veiculo).pipe(take(1)).subscribe(
      response => this.laudofull.veiculo.nome_modelo_veiculo = response.descricao
    );
  }

  carregarCarrocerias() {
    this.carroceriaService.getCarroceria()
      .pipe(toArray())
      .subscribe(c => this.laudofull.veiculo.DESCRICAO_CarroVeicu = c.find(cc => this.laudofull?.veiculo?.tpCarroVeicu == cc.value)?.label);
  }

}
