import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Corretor } from '../../../model/corretor';
import { MessageUtil } from '../../../service/message-util.service';
import { Posto } from '../../posto/model/posto';
import { Prestadora } from '../../prestadora/prestadora';
import { AgendamentoService } from '../agendamento.service';
import { Agendamento } from '../model/agendamento';
import { FiltroAgendamento } from '../model/filtro-agendamento';
import { Telefone } from '../model/telefone';
import { Logradouro } from '../../../model/logradouro';
import { Vistoria } from '../model/vistoria';
import { VistoriaService } from '../vistoria.service';
import { VistoriaDomicilio } from '../component/vistoria-domicilio/vistoria-domicilio';
import { VistoriaFrotaService } from '../component/vistoria-frota/vistoria-frota.service';
import { take, map, tap } from 'rxjs/operators';
import { EstadoService } from '../../../service/estado.service';
import { MunicipioService } from '../../../service/municipio-service';
import { Observable } from 'rxjs';
import { AceitacaoService } from '../../../service/aceitacao-service';

@Component({
  selector: 'app-vistoria-agendar',
  templateUrl: './vistoria-agendar.component.html',
  styleUrls: ['./vistoria-agendar.component.css'],
  providers: [VistoriaFrotaService]
})
export class VistoriaAgendarComponent implements OnInit {

  idVistoria: number;
  modal = false;
  vistoria: Vistoria;
  vistoriaDomicilio = new VistoriaDomicilio();

  corretor = new Corretor();
  agendamento = new Agendamento();

  cepAnterior: string//flag de controle para pesquisar com o evento blur apenas se o valor do cep foi alterado
  isReceberEmail = true;
  isCaminhao: boolean;

  empresasDistribuicao: Prestadora[];
  displaySelecionarEmpresa: boolean = false;
  displayAgendamento: boolean = false;
  msgsAgendamento: any[];
  estados: Array<any> = new Array<any>();
  municipios: Array<any> = new Array<any>();
  locais = new Array<SelectItem>();

  logradouro: Logradouro = {};
  icMbile: String;
  telefone = new Telefone();
  isRiscoPerNoite = false;
  isRiscoPerAnterior = false;//flag de controle para pesquisar com o evento click apenas se o valor do radioButton foi alterado

  constructor(
    private activatedRoute: ActivatedRoute,
    private agendamentoService: AgendamentoService,
    private vistoriaService: VistoriaService,
    private confirmationService: ConfirmationService,
    private message: MessageUtil,
    private router: Router,
    private vistoriaFrotaService: VistoriaFrotaService,
    private estadoService: EstadoService,
    private municipioService: MunicipioService,
    private aceitacaoService: AceitacaoService) {

    this.activatedRoute.queryParams.subscribe(params => this.modal = params['mdl'] == 'true');
    this.idVistoria = +this.activatedRoute.snapshot.paramMap.get('id');
    this.carregarVistoria();
  }

  ngOnInit(): void {
    this.carregarEstados();
  }

  carregarEstados() {
    this.logradouro.uf = null;
    this.estados = new Array<any>();
    this.estadoService.getEstados().forEach(uf => this.estados.push({ label: uf.sigla, value: uf.sigla }));
  }

  findMunicipios() {
    this.findMunicipiosByUf().subscribe();
  }

  findMunicipiosByUf(): Observable<any> {
    return this.municipioService.findMunicipiosByUf(this.logradouro.uf)
      .pipe(tap(resp => {
        this.municipios = new Array<any>();
        resp.forEach(element => {
          this.municipios.push({ label: element.nmMunicipio, value: element.idRegiaoAtnmtVstro });
        });
      }));
  }

  carregarVistoria() {
    this.vistoriaService.obterVistoria(this.idVistoria)
      .pipe(take(1))
      .subscribe(
        response => {
          this.vistoria = response != null ? response : new Vistoria();
          this.corretor = this.vistoria.corretor != null ? this.vistoria.corretor : new Corretor();
          this.isCaminhao = this.vistoria.tipoVeiculo == 'C';
          this.icMbile = this.vistoria.icMbile ? this.vistoria.icMbile : 'N'
          if (this.isFrota()) {
            this.pesquisarFrota();
          }
        },
        (error) => {
          let msg = 'Ocorreu um erro ao tentar carregar a vistoria.';
          
          if (error.status == 503) {
            msg = error.error.message;
          }

          if (this.modal) {
            this.message.errorInline(msg, 0);
          } else {
            this.router.navigate([`/vistoria`]).finally(() => this.message.errorInline(msg));
          }
        }
      );
  }

  private pesquisarFrota() {
    let filtro = new FiltroAgendamento();
    filtro.cpfCnpj = this.vistoria.cpfCnpj;
    filtro.corretor = this.vistoria.codCorretor;
    filtro.endosso = this.vistoria.endosso;
    filtro.negocio = this.vistoria.negocio;

    this.vistoriaService.pesquisarFrota(filtro)
      .pipe(take(1))
      .subscribe(
        resp => {
          this.vistoriaFrotaService.frota = resp;
        },
        () => {
          if (this.modal) {
            this.message.error('Ocorreu um erro ao tentar carregar a frota.');
          } else {
            this.router.navigate([`/vistoria`]);
          }
        }
      );
  }

  updateEmailsCorretor(model: string[]) {
    this.corretor.emails = model;
  }

  updateTelefonesCorretor(model: Telefone[]) {
    this.corretor.telefones = model;
  }

  limparEmailsCorretor() {
    this.corretor.emails = null;
  }

  setPosto(posto: Posto) {
    this.agendamento.codigoPosto = posto.codigoPosto;
    this.agendamento.codigoPrestadora = posto.codigoPrestadora;
  }

  public setEndereco() {
    this.vistoriaDomicilio.isCheckboxSN = false;
    this.vistoriaDomicilio.agendamento.complemento = null;
    this.vistoriaDomicilio.agendamento.numeroLogradouro = null;

    this.vistoriaDomicilio.agendamento.cep = this.logradouro.cep;
    this.vistoriaDomicilio.agendamento.logradouro = this.logradouro.logradouro;
    this.vistoriaDomicilio.agendamento.bairro = this.logradouro.bairro;
    this.vistoriaDomicilio.agendamento.cidade = this.logradouro.cidade;
    this.vistoriaDomicilio.agendamento.uf = this.logradouro.uf;
  }

  onChangeTipoAgendamento(novoLocal?: string) {
    this.vistoriaDomicilio = new VistoriaDomicilio();
    this.agendamento = new Agendamento();
    this.isCaminhao = false;
    this.telefone = new Telefone();

    if (novoLocal) {
      this.agendamento.tipo = novoLocal;
    }

    if (novoLocal == 'D') {
      if (this.logradouro.cep == null) {
        this.agendamento.tipo = null;
        this.message.warnInline('Obrigatório informar o CEP para seguir com o agendamento em domicilio.');
      } else {
        this.setEndereco();
      }
    }
  }

  consultarDistribuicaoEmpresa() {
    let agendamento = this.vistoriaDomicilio.agendamento;
    this.agendamentoService.consultarDistribuicao(this.idVistoria, agendamento.dataVistoria, this.logradouro.idRegiao)
      .pipe(take(1))
      .subscribe(empresas => { this.exibirEmpresas(empresas); });
  }

  private exibirEmpresas(response: Prestadora[]) {
    let isUnicaEmpresa = response.length == 1;
    let empresaPreferencial = response[0];
    this.agendamento.codigoPrestadora = empresaPreferencial.codigoPrestadora;
    this.confirmationService.confirm({
      message: `<span class="d-inline-block">
      <p>Este agendamento será direcionado para a empresa ${empresaPreferencial.razaoSocial}.
      Deseja confirmar a empresa${isUnicaEmpresa ? '' : ' ou escolher outra'}?</p>
      </span>`,
      header: 'Confirmação',
      acceptLabel: 'Confirmar',
      rejectLabel: (isUnicaEmpresa ? 'Cancelar' : 'Outra Empresa'),
      icon: 'pi pi-exclamation-triangle',
      key: 'confirmarEmpresa',
      accept: () => {
        this.agendar();
      },
      reject: () => {
        if (!isUnicaEmpresa) {
          this.selecionarEmpresa(response);
        }
      }
    });
  }

  private selecionarEmpresa(response) {
    if (this.isDomicilio()) {
      this.empresasDistribuicao = response;
      this.displaySelecionarEmpresa = true;
    }
  }

  isDomicilio() {
    return this.agendamento.tipo == 'D';
  }

  isMobile() {
    return this.agendamento.tipo == 'M';
  }

  isFrota() {
    return this.vistoria.frota;
  }

  public agendar() {
    this.preparaRequest();
    this.agendamento.telefones = new Array<Telefone>();
    if (this.agendamento.tipo === 'D') {
      this.agendamento.telefones = this.vistoriaDomicilio.telefones;
    } else {
      this.agendamento.telefones.push(this.telefone)
    }
    this.agendamentoService.agendar(this.agendamento)
      .pipe(
        map(resp => resp.sort(r1 => r1.error == null ? -1 : 1)),
        take(1)
      )
      .subscribe(
        resp => { this.msgsAgendamento = resp; this.displayAgendamento = true; }
      );
  }

  private preparaRequest() {
    this.agendamento.agendamentoDomicilio = this.vistoriaDomicilio.agendamento;

    if (this.isDomicilio() && this.agendamento.agendamentoDomicilio && this.agendamento.agendamentoDomicilio.cidade) {
      this.agendamento.agendamentoDomicilio.cidade = this.agendamento.agendamentoDomicilio.cidade.substring(0, 40);
    }

    this.agendamento.emails = this.vistoriaDomicilio.emails;
    this.agendamento.telefones = this.vistoriaDomicilio.telefones;
    this.agendamento.contato = this.vistoriaDomicilio.contato;
    if (this.isFrota()) {
      this.agendamento.idsVistorias = [];
      this.vistoriaFrotaService.itensFrotaSelecionados.forEach(f => this.agendamento.idsVistorias.push(f.id));
    }
    else {
      this.agendamento.idsVistorias = [this.idVistoria];
    }
    this.agendamento.vistoria = new Vistoria();
    this.agendamento.vistoria.emailCliente = this.vistoria.emailCliente;
    this.agendamento.vistoria.corretor = this.corretor;
  }

  confirmarAgendamento() {
    if (this.validarAgendamento()) {
      this.confirmationService.confirm({
        message: `<span class="d-inline-block">
                      <p>Deseja confirmar o agendamento da vistoria previa?</p>
                    </span>`,
        header: 'Confirmação',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        icon: 'pi pi-exclamation-triangle',
        key: 'confirmarAgendamento',
        accept: () => {
          if (this.isDomicilio()) {
            this.consultarDistribuicaoEmpresa();
          } else {
            this.agendar();
          }
        }
      });
    }
  }

  validarAgendamento(): boolean {
    if (this.isReceberEmail && (!this.corretor.emails || this.corretor.emails.some(e => e == null || e.trim().length == 0))) {
      this.message.warnInline('E-mail corretor para confirmação de vistoria não informado.');
      return false;
    }

    if (!this.corretor.telefones || this.corretor.telefones.some(t => t.ddd == null || t.ddd.trim().length == 0 || t.telefone == null || t.telefone.trim().length == 0)) {
      this.message.warnInline('Informe "DDD/Telefone" de contato do corretor.');
      return false;
    }

    if (!this.agendamento.tipo) {
      this.message.warnInline('Informe "Local da Vistoria"');
      return false;
    } else {
      if (this.isDomicilio()) {
        if (!this.vistoriaDomicilio.agendamento.cep) {
          this.message.warnInline('Informe "CEP" para vistoria a domicilio.');
          return false;
        }

        if (!this.vistoriaDomicilio.agendamento.logradouro) {
          this.message.warnInline('Informe "Endereço" para vistoria a domicilio.');
          return false;
        }

        if (!this.vistoriaDomicilio.agendamento.numeroLogradouro) {
          this.message.warnInline('Informe "Numero Endereço" para vistoria a domicilio.');
          return false;
        }

        if (!this.vistoriaDomicilio.agendamento.bairro) {
          this.message.warnInline('Informe "Bairro" para vistoria a domicilio.');
          return false;
        }

        if (!this.vistoriaDomicilio.agendamento.cidade) {
          this.message.warnInline('Informe "Cidade" para vistoria a domicilio.');
          return false;
        }

        if (!this.vistoriaDomicilio.agendamento.uf) {
          this.message.warnInline('Informe "UF" para vistoria a domicilio.');
          return false;
        }

        if (!this.vistoriaDomicilio.agendamento.dataVistoria) {
          this.message.warnInline('Informe "Data Vistoria".');
          return false;
        }

        if (!this.vistoriaDomicilio.agendamento.periodoVistoria) {
          this.message.warnInline('Informe "Período Vistoria".');
          return false;
        }

        if (!this.vistoriaDomicilio.contato) {
          this.message.warnInline('Informe "Nome Contato" para vistoria.');
          return false;
        }

        if (!this.vistoriaDomicilio.telefones || this.vistoriaDomicilio.telefones.some(t => t.ddd == null || t.ddd.trim().length == 0 || t.telefone == null || t.telefone.trim().length == 0)) {
          this.message.warnInline('Informe "DDD/Telefone" de contato para vistoria.');
          return false;
        }
      } else if (this.isMobile()) {
        if (this.telefone.ddd == null || this.telefone.telefone == null || this.telefone.contato == null) {
          this.message.warnInline('Nome de Contato e DDD/Telefone obrigatório.');
          return false;
        }
      } else {
        if (!this.agendamento.codigoPosto) {
          this.message.warnInline('Selecione "Posto de Vistoria".');
          return false;
        }
      }
    }

    if (this.isFrota() && (!this.vistoriaFrotaService.itensFrotaSelecionados
      || this.vistoriaFrotaService.itensFrotaSelecionados.length == 0)) {
      this.message.warnInline('Selecione um ou mais itens da frota.');
      return false;
    }

    return true;
  }

  fechar() {
    let hasError = this.msgsAgendamento.find(r => r.error != null);

    if (hasError || this.isFrota()) {
      if (this.isFrota()) {// && this.msgsAgendamento.find(r => r.error == null)
        this.vistoriaFrotaService.frota = [];
        this.vistoriaFrotaService.itensFrotaSelecionados = [];
        this.pesquisarFrota();
      }
    } else {
      if (!this.modal) {
        this.router.navigate([`/vistoria`]);
      }
    }
  }

  showLocal() {
    this.locais = [];
    this.locais.push({ value: null, label: 'Selecione Local' });
    this.agendamentoService.obterLocais(this.idVistoria, this.logradouro.idRegiao)
      .subscribe(resp => {
        if (resp && resp.length > 0) {
          resp.forEach(l => this.locais.push({ value: l.codigo, label: l.descricao }));

          if (resp.length == 1) {
            this.onChangeTipoAgendamento(this.locais[1].value);
          }

        } else {
          this.message.warnInline('No momento não temos prestador disponível nessa cidade para realizar a vistoria prévia. Tente agendar em outra cidade ou consulte sua sucursal.');
          this.recuperarLogradouro();
        }
      });
  }

  resetRiscoPerNoite(valor) {
    if (this.isRiscoPerAnterior != valor) {
      this.isRiscoPerAnterior = valor;

      this.cepAnterior = null;
      this.limparLocalVistoria();

      if (valor) {
        this.validaRiscoPerNoite();
      }
    }
  }

  private limparLocalVistoria() {
    this.locais = new Array<any>();
    this.municipios = new Array<any>();
    this.logradouro = {};
    this.onChangeTipoAgendamento();
  }

  validaRiscoPerNoite() {
    let mun;
    this.aceitacaoService.obterLogradouro(this.vistoria.cep).subscribe(resp => {
      if (resp) {
        this.logradouro = resp;

        this.findMunicipiosByUf().subscribe(() => {
          mun = this.municipios.find(mun => mun.label === resp.cidade)
          if (mun) { this.logradouro.idRegiao = mun.value; }
          if (!this.logradouro.idRegiao) {
            this.message.warnInline('Municipio não encontrado colocar manualmente');
          } else {
            this.showLocal();
          }
        });
      };
    });
  }

  clearLocais() {
    this.locais = [];
    if (this.logradouro.idRegiao && !this.logradouro.cidade) {
      this.logradouro.cidade = this.municipios.find(m => m.value == this.logradouro.idRegiao).label;
    }
  }

  recuperarLogradouro() {
    if (this.logradouro.cep != this.cepAnterior) {
      this.cepAnterior = this.logradouro.cep;

      this.limparLocalVistoria();

      this.logradouro.cep = this.cepAnterior;

      if (this.logradouro.cep) {
        this.aceitacaoService.obterLogradouro(this.logradouro.cep)
          .pipe(take(1)).subscribe(resp => {
            if (resp) {
              this.logradouro = resp
              this.findMunicipiosByUf().subscribe(() => {
                let mun = this.municipios.find(mun => mun.label === resp.cidade)
                if (mun) { this.logradouro.idRegiao = mun.value; }
                if (!this.logradouro.idRegiao) {
                  this.message.warnInline('Municipio não encontrado colocar manualmente');
                } else {
                  this.showLocal();
                }
              });
            } else {
              this.message.warnInline('Logradouro não encontrado para o CEP informado, re-digite o CEP ou preencha manualmente os campos.');
            }
          });
      }
    }
  }
}
