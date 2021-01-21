import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';

import { RegiaoTarifariaService } from '../../../service/regiao-tarifaria.service';
import { MessageUtil } from '../../../service/message-util.service';
import { MunicipioService } from '../../../service/municipio-service';
import { PrestadoraVistoriaService } from '../../../view/prestadora/prestadora-module/prestadora-vistoria-service';
import { DistribuicaoMunicipio } from '../../../model/distribuicao-municipio';
import { DistribuicaoPrestadora } from '../../../model/distribuicao-prestadora';

@Component({
  selector: 'app-regiao-tarifaria',
  templateUrl: './regiao-tarifaria.component.html',
  styleUrls: ['./regiao-tarifaria.component.css']
})
export class RegiaoTarifariaComponent implements OnInit {

  constructor(
    private regiaoTarifariaService: RegiaoTarifariaService,
    private prestadoraService: PrestadoraVistoriaService,
    private municipioService: MunicipioService,
    private message: MessageUtil
  ) { }

  distribuicao: any[];
  distribuicaoUF = new DistribuicaoMunicipio();
  distribuicaoMunicipio: DistribuicaoMunicipio[];

  novaDistribuicao = [];

  idRegiaoAtnmtVstro: number;
  codigoMunicipio: number;
  uf: string;

  municipios: SelectItem[];
  prestadoras: SelectItem[];
  isRedistribuir = true;
  modalAlterarPercentual = false;
  totalDistr: number;
  clonedValue: number;

  ngOnInit(): void {
    this.prestadoraService.getAllVistoriaPrevia()
      .subscribe(p => {
        if (p) {
          this.prestadoras = [];
          p.forEach(i => this.prestadoras.push(<SelectItem>{ value: i.cdAgrmtVspre, label: i.nmRazaoSocal }));
        }
      });

    this.carregarDistribuicaoMunicipio();
  }

  pesquisar() {
    this.distribuicao = null;
    this.regiaoTarifariaService.findAllPrestadoraVistoriaPreviaByIdRegiao(this.idRegiaoAtnmtVstro).subscribe(resp => {
      if (resp && resp.length > 0) {
        this.distribuicao = resp;
      } else {
        this.distribuicao = [];
        this.message.warnInline('Não foram localizados percentuais de distribuição para o município.');
      }
    })
  }

  findMunicipio() {
    this.distribuicao = null;
    this.uf = null;
    this.municipios = null;
    this.idRegiaoAtnmtVstro = null;
    this.municipioService.findMunicipioByCodigo(this.codigoMunicipio)
      .subscribe(resp => {
        if (resp) {
          this.uf = resp.uf;
          this.municipios = [{ label: resp.nmMunicipio, value: resp.idRegiaoAtnmtVstro }];
          this.idRegiaoAtnmtVstro = resp.idRegiaoAtnmtVstro;
        } else {
          this.message.warnInline(`Município código ${this.codigoMunicipio} não existe.`);
        }
      });
  }

  findMunicipios() {
    this.distribuicao = null;
    this.codigoMunicipio = null;
    this.idRegiaoAtnmtVstro = null;
    this.municipioService.findMunicipiosByUf(this.uf)
      .subscribe(resp => {
        this.municipios = [];
        resp.forEach(element => {
          this.municipios.push({ label: element.nmMunicipio, value: element.idRegiaoAtnmtVstro });
        });
      });
  }

  salvar() {
    if (this.isTotalDistribuicaoInvalido()) {
      this.message.warn(`O percentual total de distribuição deve ser 0% ou 100%.`);
    } else if (this.novaDistribuicao.find(d => this.isItemInvalido(d))) {
      this.message.warn(`Item inválido na lista. Remova-o ou informe a Prestadora e o percentual de distribuição.`);
    } else {
      this.regiaoTarifariaService.save(this.idRegiaoAtnmtVstro, this.novaDistribuicao).subscribe(() => {
        // this.parametroPercentualDistribuicaoModel = new ParametroPercentualDistribuicaoModel();
        this.message.successInline(`Percentual de distribuição cadastrado.`);
        this.modalAlterarPercentual = false;
        this.pesquisar();
      });
    }
  }

  isItemInvalido(d: any): boolean {
    return !d.codigoPrestadora || !d.percentualDistribuicao;
  }

  isTotalDistribuicaoInvalido(): boolean {
    return this.totalDistr != 100 && this.totalDistr != 0;
  }

  editar() {
    this.novaDistribuicao = this.distribuicao.filter(d => d.dataFimVigencia > Date.now()).map(d => <any>{ ...d });
    this.updateTotalPerc();
    this.modalAlterarPercentual = true;
  }

  add() {
    if (this.permiteAdd()) {
      this.novaDistribuicao.push({ novo: true });
    }
  }

  remove(index: number) {
    this.novaDistribuicao.splice(index, 1);
    this.updateTotalPerc();
  }

  verificarDuplicidade(event, dropdown: Dropdown) {
    if (this.novaDistribuicao.filter(d => d.codigoPrestadora == event.value).length > 1) {
      this.message.warn('Prestadora já inserida.');
      dropdown.clear(event);
    }
  }

  permiteAdd() {
    return this.novaDistribuicao.filter(d => !d.codigoPrestadora).length == 0;
  }

  onFocus(percentualDistribuicao: any) {
    this.clonedValue = percentualDistribuicao;
  }

  onBlur(distribuicao: any) {
    if (distribuicao.codigoPrestadora) {
      if (distribuicao.percentualDistribuicao >= 0 && distribuicao.percentualDistribuicao <= 100) {
        if (distribuicao.percentualDistribuicao != this.clonedValue && this.isRedistribuir) {
          this.updateTotalPerc();
        }
      } else if (distribuicao.percentualDistribuicao) {
        let prestadora = this.prestadoras.find(p => p.value == distribuicao.codigoPrestadora);
        this.message.warn(`Valor inválido para a prestadora ${prestadora.label}. Informe um valor entre 0 e 100.`);
        distribuicao.percentualDistribuicao = this.clonedValue;
      }
    }
  }

  updateTotalPerc() {
    if (this.novaDistribuicao && this.novaDistribuicao.length > 0) {
      if (this.novaDistribuicao.length > 1) {
        this.totalDistr = this.novaDistribuicao
          .filter(d => !this.isItemInvalido(d))
          .map(d => +d.percentualDistribuicao)
          .reduce((accumulator, currentValue) => accumulator + currentValue);
      } else {
        this.totalDistr = this.novaDistribuicao[0].percentualDistribuicao;
      }
    } else {
      this.totalDistr = 0;
    }
  }

  carregarDistribuicaoMunicipio() {
    this.regiaoTarifariaService.findDistribuicaoMunicipio()
      .subscribe(resp => this.distribuicaoMunicipio = resp);
  }

  addDistribuicaoPrestadora(): void {
    if (!this.distribuicaoUF.uf) {
      this.message.warnInline('Selecione a UF.');
      return;
    }

    if (!this.distribuicaoUF.prestadoras) {
      this.distribuicaoUF.prestadoras = [];
    }

    this.distribuicaoUF.prestadoras.push(new DistribuicaoPrestadora());
  }

  removeDistribuicaoPrestadora(index: number): void {
    this.distribuicaoUF.prestadoras.splice(index, 1);
  }

  carregarPorUF() {
    let dis = this.distribuicaoMunicipio.find(d => d.uf == this.distribuicaoUF.uf);
    if (dis) {
      this.distribuicaoUF.prestadoras = [];
      dis.prestadoras.forEach(p => this.distribuicaoUF.prestadoras.push({...p}));
    } else {
      this.distribuicaoUF.prestadoras = null;
    }
  }

  redistribuir() {
    if (this.validarRedistribuicao(this.distribuicaoUF)) {
      this.regiaoTarifariaService.redistribuirPorUF(this.distribuicaoUF)
      .subscribe(() => {
        this.carregarDistribuicaoMunicipio();
        this.message.successInline(`Percentuais redistribuídos.`);
      }, 
      error => {
        if (error.status == 412) {
          this.message.warnInline(error.error.message);
        } else {
          this.message.errorInline('Ocorreu um erro ao tentar redistribuir.');
        }
      });
    }
  }

  validarRedistribuicao(distribuicaoUF: DistribuicaoMunicipio): boolean {
    if (!distribuicaoUF.uf) {
      this.message.warnInline('Selecione a UF.');
      return false;
    }

    if (!distribuicaoUF.prestadoras || distribuicaoUF.prestadoras.length == 0) {
      this.message.warnInline('Informe uma ou mais prestadoras para redistribuir.');
      return false;
    }

    let d = distribuicaoUF.prestadoras.find(d => d.codigo==null || d.percentual==null);
    
    if (d) {
      if (!d.codigo) {
        this.message.warnInline('Informe a prestadora.');
      } else {
        this.message.warnInline('Informe o percentual de distribuição.');
      }
      return false;
    }

    return true;
  }
}
