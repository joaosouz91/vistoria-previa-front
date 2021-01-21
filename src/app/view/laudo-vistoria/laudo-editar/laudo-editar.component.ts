import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageUtil } from '../../../service/message-util.service';

import { Proponente } from '../model/proponente';
import { LaudoVistoria } from '../model/laudo-vistoria';
import { LaudoFull } from '../model/laudo-full';
import { Veiculo } from '../model/veiculo';
import { LaudoVistoriaService } from '../laudo-vistoria-module/laudo-vistoria-service';
import { PrestadoraVistoriaService } from '../../prestadora/prestadora-module/prestadora-vistoria-service';
import { EstadoService } from '../../../service/estado.service';
import { CarroceriaService } from '../../../service/carroceria-service';
import { ComboService } from '../../../service/combos-services';
import { Corretor } from '../../../model/corretor';
import { CorretorService } from '../../../service/corretor-service';
import { Parecer } from '../model/parecer';
import { take } from 'rxjs/operators';
import { AvariaLaudoVistoriaPrevia } from '../model/AvariaLaudoVistoriaPrevia';
import { SelectItem } from 'primeng/api/selectitem';




@Component({
  selector: 'app-laudo-editar',
  templateUrl: './laudo-editar.component.html'
})
export class LaudoEditarComponent implements OnInit {

  pt: any;
  corretorFiltro:Corretor
  obterCorretorTela:Corretor
  corretores: Corretor[] = [];
  tipoCor: SelectItem[] = [{ label: 'COMUM', value: 'C' }, { label: 'METÁLICA', value: 'M' }, { label: 'PEROLIZADA', value: 'P' }];
  formatoCarroceria: SelectItem[] = [{label: 'ABERTA', value: 1 }, { label: 'FECHADA', value: 2 }];
  situacao: SelectItem[] = [{ label: 'VINCULADO', value: 'S' }, { label: 'NÃO VINCULADO', value: 'N' }];
  tipoCambio: SelectItem[] = [{ label: 'MECÂNICO', value: '1' }, { label: 'AUTOMÁTICO', value: '2' }];
  simNao: SelectItem[] = [{ label: 'SIM', value: 'S' }, { label: 'NÃO', value: 'N' }];
  statusParecerTecnico: SelectItem[] = [{ label: 'ACEITAVEL', value: 'A' }, { label: 'RECUSADA', value: 'R' } , { label: 'ACEITACAO FORCADA', value: 'AF' } , 
                                        { label: 'SUJEITO A ANALISE', value: 'S' }, { label: 'LIBERADA', value: 'L' }, { label: 'FRUSTRADA', value: 'F' },
                                        { label: 'REGULARIZACAO', value: 'RG' }, { label: 'ACEITAVEL_LIBERADA', value: 'AL' }]; 
  estadoCivil: SelectItem[];

  laudofull: LaudoFull;
  finalidades: SelectItem[] = [];
  localVistoria: SelectItem[] = [];
  ecs: SelectItem[];
  statusLaudo: SelectItem[];
  combustiveis: SelectItem[];
  tipoCondutor: SelectItem[];
  tipoCabine: SelectItem[];
  carrocerias: SelectItem[];
  tiposeguro: SelectItem[];
  tipoGaragem: SelectItem[];
  tipoveiculoUtilizacao: SelectItem[];
  ufs: SelectItem[];
  tipofrustracao : SelectItem[];
  tipoMaterialCarroceria: SelectItem[];
  showModelNew: Boolean = false;
  habilitado: boolean;
  labelbutton: String;
  display: boolean = false;
  pareceres: Parecer;
  nomeCorretor:string;
  fabricantes: SelectItem[];
  modelos: SelectItem[];
  avarias: SelectItem[];
  pecas: SelectItem[];
  avariaLaudoVistoriaPrevia: AvariaLaudoVistoriaPrevia = new AvariaLaudoVistoriaPrevia();
  filtroLaudo: any;




  /*<---------------   Construtor  --------------- */

  constructor(private activatedRoute: ActivatedRoute, 
              private laudoService: LaudoVistoriaService, 
              private messageService: MessageUtil,
              private prestadoraService: PrestadoraVistoriaService, 
              private combos:ComboService, 
              private estadoService: EstadoService, 
              private carroceriaService:CarroceriaService, 
              private corretorService: CorretorService) {

    this.laudofull = new LaudoFull;
    this.laudofull.laudo = new LaudoVistoria;
    this.laudofull.veiculo = new Veiculo;
    this.laudofull.proponente = new Proponente;
    this.laudofull.acessorios =  new Array<any>();
    this.laudofull.pareceres =  new Array<Parecer>();
    this.corretorFiltro =  new Corretor
    this.obterCorretorTela =  new Corretor

    this.laudofull.CODIGO_LVPRE = this.activatedRoute.snapshot.paramMap.get('codigoLaudo');
    this.habilitado = true;
    this.labelbutton = "Habilitar Edição";

    this.ecs = [];
    this.statusLaudo = [];
    this.ufs = [];
    this.combustiveis = [];
    this.tipoCondutor = [];
    this.carrocerias = [];
    this.tiposeguro = [];
    this.tipofrustracao = [];
    this.tipoMaterialCarroceria = [];
    this.tipoCabine = [];
    this.tipoGaragem = [];
    this.tipoveiculoUtilizacao = [];
    this.modelos = [];

    


  }

  /*<---------------   método Init  --------------- */




  ngOnInit() {
    this.filtroLaudo = history.state.filtroLaudo;
 
    this.pt = {
        firstDayOfWeek: 1,
        dayNames: [ "Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado" ],
        dayNamesShort: [ "Dom","Seg","Ter","Quar","Qui","Sex","Sáb" ],
        dayNamesMin: [ "D","S","T","Q","Q","S","S" ],
        monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
        monthNamesShort: [ "Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez" ],
        today: 'Hoje',
        clear: 'Excluir'
    }

    
    this.carregaTipoVeiculoUtilizacao();
    this.carregaTipoGaragem();
    this.carregaTipoCabine();
    this.carregaTipoCondutor();
    this.carregarCarrocerias();
    this.carregarStatusLaudo();
    this.carregaEstadoCivil();
    this.carregaTipoLocalVistoria();
    this.carregaEstados();
    this.carregaCombustiveis();
    this.carregaTipoSeguro();
    this.carregaTipoFrustracao();
    this.buscarLaudoDadosBasicos();
    this.carregaTipoMaterialCarroceria();
    this.carregaParecerTecnico();
    this.carregaFabricantes();
    this.carregaAvarias();
    this.carregaPecas();

  }


/*<---------------      Consulta dados básicos Laudo     -------------------- */
  buscarLaudoDadosBasicos() {
    this.laudoService.obterLaudo(this.laudofull.CODIGO_LVPRE).pipe(take(1)).subscribe(
      response => {
        this.laudofull = response;
        this.obterCorretor(this.laudofull.laudo.CODIGO_CORRETOR_SEGURADO);
        this.carregaModeloFabricantes();
        this.carregaPrestadoras();
        this.carregarFinalidade();
      },
      error => {
        if (error.status == 400) {
          this.messageService.error('Erro ao buscar dados básicos do laudo!');
        } else if (error.status > 400){
          this.messageService.error('Servidor não encontrado!');
        } else {
          this.messageService.warn('Dados não encontrados!');

      }
      }
    );

  }

  


/*<---------------   Metodos que atualiza o objeto em tela   --------------- */



  atualizar() {
    this.addModeloVeiculo();

    this.laudoService.atualizar(this.laudofull).pipe(take(1)).subscribe(
      response => {
        response;
        this.messageService.success('Dados salvos com sucesso!');
      },
      error => {
        if (error.status == 400) {
          this.messageService.error('Dados inválidos!');
        } else {
          this.messageService.error('Servidor não encontrado!');
        }
      }
    );


  }

/*<---------------   Metodo que habilita a edição    -----------------------> */

  habilitarEdicao() {
    if (this.habilitado) {
      this.habilitado = false;
      this.labelbutton = "Desabilitar Edição"
    } else {
      this.habilitado = true;
      this.labelbutton = "Habilitar Edição"
    }
  }


  showDialogEditarCorretor(){
    this.display = true;
  }


  botaoPesquisarCorretor(){       
        this.corretorService.postPesquisaCorretor(this.corretorFiltro).pipe(take(1)).subscribe(
            response => { 
                this.corretores = response;
            },
            error => {
                if(error.status == 400){
                    this.messageService.error('Erro ao pesquisar corretores!');
                } else {
                    this.messageService.error('Servidor não encontrado!');
                }
            }
        );
      
}


obterCorretor(codigo:number){
   this.obterCorretorTela.idCorretor =codigo;
    this.corretorService.postPesquisaCorretor(this.obterCorretorTela).pipe(take(1)).subscribe(
      response => { 
          this.nomeCorretor = `${codigo} - ${response[0].nomeCorretor}`;
      },
      error => {
          if(error.status == 400){
              this.messageService.error('Erro ao buscar Corretor!');
          } else {
              this.messageService.error('Servidor não encontrado!');
          }
      }
  );
};

botaoSelecionaCorretor(corretor: Corretor){
  this.laudofull.laudo.CODIGO_CORRETOR_SEGURADO = corretor.idCorretor;
  this.nomeCorretor = `${corretor.idCorretor} - ${corretor.nomeCorretor}`;
  this.display = false;
  this.messageService.success('Corretor selecionado com sucesso!!');
}


    
  
/*<---------------   Metodos que carregam os dropdown   -------------------->*/





  carregarFinalidade(){
    if (this.laudofull?.laudo?.CODIGO_FINALIDADE_VSPRE) {
      this.laudoService.obterFinalidade(this.laudofull.laudo.CODIGO_FINALIDADE_VSPRE)
      .pipe(take(1)).subscribe(
        resp => this.laudofull.laudo.DESCRICAO_FINALIDADE_VSPRE = resp.dsFnaldVspre
      );
    }
  }    

  carregaPrestadoras() {
    if (this.laudofull?.laudo?.CODIGO_EMPRESA_VISTORIA) {
      this.prestadoraService.getPrestadoraVistoria(this.laudofull.laudo.CODIGO_EMPRESA_VISTORIA)
        .pipe(take(1)).subscribe(
          resp => this.laudofull.laudo.NOME_EMPRESA_VISTORIA = resp.razaoSocial
        );
    }
  }   

  carregaTipoLocalVistoria(){
      let lista  = [];
      this.laudoService.getListaTipoLocalVistoria().pipe(take(1)).subscribe(
          response => { 
              response.forEach(x => {
                      lista.push({label: x.dsRmidaColunTipo, value: x.vlCntdoColunTipo})
                      this.localVistoria = lista
                  },
                  error => {
                      if(error.status == 400){
                          this.messageService.error('Erro ao pesquisar Tipo Local!');
                      } else {
                          this.messageService.error('Servidor não encontrado!');
                      }
                  }
                  )},
      );
  }

 carregaEstadoCivil(){
      let lista  = []
        this.combos.listaEstadoCivil().pipe(take(1)).subscribe(
          response => {
            response.forEach(x => {
              lista.push({label : x.descricao, value: x.codigo})
              this.ecs = lista
      })},
    );
}

carregarStatusLaudo(){
  let lista  = []
    this.combos.listaStatusLaudo().pipe(take(1)).subscribe(
      response => {
        response.forEach(x => {
          lista.push({label : x.descricao, value: x.codigo})
          this.statusLaudo = lista
  })},
);
}

carregaCombustiveis(){
  let lista  = []
    this.combos.listaTipoCombustivel().pipe(take(1)).subscribe(
      response => {
        response.forEach(x => {
          lista.push({label : x.descricao, value: x.codigo})
          this.combustiveis = lista
  })},
);
}

carregaTipoSeguro(){
  let lista = [];
  this.combos.listaTipoSeguro().pipe(take(1)).subscribe(
    response => {
      response.forEach( x => {
          lista.push({label: x.descricao, value: x.value})
          this.tiposeguro = lista;
        })}
  );
}

carregaTipoCondutor(){
  let lista = [];
  this.combos.listaTipoCondutor().pipe(take(1)).subscribe(
    response => {
      response.forEach( x => {
          lista.push({label: x.descricao, value: x.id})
        })
      },
        () => {}, 
        
        () => {this.tipoCondutor = lista}  
  );
}

carregaTipoFrustracao(){
  let lista = [];
  this.combos.listaTipoFrustracao().pipe(take(1)).subscribe(
    response => {
      response.forEach( x => {
          lista.push({label: x.descricao, value: x.id})
        })
      },
        () => {}, 
        
        () => {this.tipofrustracao = lista}  
  );
}

carregaTipoMaterialCarroceria(){
  let lista = [];
  this.combos.listaTipoMaterialCarroceria().pipe(take(1)).subscribe(
    response => {
      response.forEach( x => {
          lista.push({label: x.descricao, value: x.id})
        })
      },
        () => {}, 
        
        () => {this.tipoMaterialCarroceria = lista}  
  );
}

carregaTipoCabine(){
  let lista = [];
  this.combos.listaTipoCabine().pipe(take(1)).subscribe(
    response => {
      response.forEach( x => {
          lista.push({label: x.descricao, value: x.id})
        })
      },
        () => {}, 
        
        () => {this.tipoCabine = lista}  
  );
}

carregaTipoGaragem(){
  let lista = [];
  this.combos.listaTipoGaragem().pipe(take(1)).subscribe(
    response => {
      response.forEach( x => {
          lista.push({label: x.descricao, value: x.id})
        })
      },
        () => {}, 
        
        () => {this.tipoGaragem = lista}  
  );
}

carregaTipoVeiculoUtilizacao(){
  let lista = [];
  this.combos.listaVeiculoUtilizacao().pipe(take(1)).subscribe(
    response => {
      response.forEach( x => {
          lista.push({label: x.descricao, value: x.id})
        })
      },
        () => {}, 
        
        () => {this.tipoveiculoUtilizacao = lista}  
  );
}

carregaParecerTecnico(){
  this.combos.listaParecerTecnico().pipe(take(1)).subscribe(
    response =>{
     this.pareceres = response

    }
  )
}

carregaFabricantes(){
  let lista = [];
  this.combos.listaFabricantes().pipe(take(1)).subscribe(
    response => {
      response.forEach( x => {
          lista.push({label: x.descricao, value: x.id})
        })
      },
        () => {}, 
        
        () => {this.fabricantes = lista}  
  );
}

carregaAvarias(){
  this.avarias = [];
  this.laudoService.getListaAvarias().subscribe(resp => {
    resp.forEach( x => {
      this.avarias.push({label: x.descricaoAvaria, value: x.codigoAvaria})
    })
  })
}

carregaPecas(){
  this.pecas = [];
  this.laudoService.getListaPecas().subscribe(resp => {
    resp.forEach( x => {
      this.pecas.push({label: x.descricaoPeca, value: x.codigoPeca})
    })
  })
}

carregaModeloFabricantes(){
  let lista = [];
  this.combos.listaModelos(this.laudofull.veiculo.codigo_fabricante).pipe(take(1)).subscribe(
    response => {
      response.forEach( x => {
          lista.push({label: x.descricao, value: x.id})
        })
      },
        () => {}, 
        
        () => {this.modelos = lista}  
  );
}


carregaEstados(){
  this.estadoService.getEstados().forEach(uf => this.ufs.push({ label: uf.sigla, value: uf.sigla }));
}

carregarCarrocerias(){
  this.carroceriaService.getCarroceria().forEach(cr => this.carrocerias.push({label: cr.label, value:cr.value}))
}
showDialogToAdd(){
  this.avariaLaudoVistoriaPrevia = new AvariaLaudoVistoriaPrevia();
  this.showModelNew = true;
}
showModal(item){
 this.laudoService.getAvaria(this.laudofull.laudo.CODIGO_LVPRE, item[0], item[2] ).subscribe(resp => {
   this.avariaLaudoVistoriaPrevia = resp;
  
  })
  this.showModelNew = true;
}

saveAvaria() {
 this.avariaLaudoVistoriaPrevia.cdLvpre = this.laudofull.laudo.CODIGO_LVPRE;
 this.laudoService.saveAvariaLaudoVistoriaPrevia(this.avariaLaudoVistoriaPrevia).subscribe(resp => {
   this.laudoService.getAvarias(this.laudofull.laudo.CODIGO_LVPRE).subscribe(resposta => {
    this.showModelNew = false;
     this.laudofull.avarias = resposta;
   })
 })
}

deleteAvaria(item){
  this.laudoService.deleteAvaria(this.laudofull.laudo.CODIGO_LVPRE, item[0], item[2]).subscribe(resp => {
    this.laudofull.avarias = resp;
  })
 }

  addModeloVeiculo() {
    this.laudofull.veiculo.modelo_veiculo = this.modelos.find(m => m.value == this.laudofull.veiculo.codigo_modelo_veiculo).label;
  }
}
 