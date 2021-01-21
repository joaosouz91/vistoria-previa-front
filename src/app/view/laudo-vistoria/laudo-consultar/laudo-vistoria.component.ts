import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageUtil } from '../../../service/message-util.service';
import { take } from 'rxjs/operators';

import { FiltroLaudo } from '../filtro-response/filtro-laudo';
import { LaudoVistoriaService } from '../laudo-vistoria-module/laudo-vistoria-service';
import { ResponseLaudo } from '../filtro-response/response-laudo';
import { LaudoFull } from '../model/laudo-full';
import { LaudoVistoria } from '../model/laudo-vistoria';
import { Veiculo } from '../model/veiculo';
import { RegraAcesso } from '../model/regras-acesso';

@Component({
  selector: 'app-laudo-vistoria',
  templateUrl: './laudo-vistoria.component.html'
})
export class LaudoVistoriaComponent implements OnInit {

  laudos: Array<ResponseLaudo> = new Array();
  filtro:FiltroLaudo ;
  alteraData:boolean;
  blockLaudo:boolean;
  detalheLaudo:boolean;
  laudofull :LaudoFull;
  regras :RegraAcesso;
  alcada:string;
  logsDetalhes: string[];
  habilitado: Boolean;
  loading: any;
  constructor(private router: Router,private messageService: MessageUtil,
              private laudoService: LaudoVistoriaService,private confirmationService: ConfirmationService) {

    this.filtro = new FiltroLaudo;
    this.laudofull = new LaudoFull;
    this.laudofull.laudo = new LaudoVistoria;
    this.laudofull.veiculo = new Veiculo;
   }

  ngOnInit() {
    let filtroLaudo = history.state.filtroLaudo;
    if(filtroLaudo){
      this.filtro = filtroLaudo;
      this.pesquisar();
    }
  }

//*************      Pesquisa, busca e atualiza Laudo       *************//

  pesquisar(){

    if (!this.filtro.chassi && !this.filtro.cnpj && !this.filtro.cpf && !this.filtro.numeroVistoria
      && !this.filtro.numeroVoucher && !this.filtro.placa) {

        this.messageService.warnInline('Preencha ao menos um dos campos para a pesquisa.');
        
      } else {
        this.laudoService.consultarLaudo(this.filtro).pipe(take(1)).subscribe(  
          response => {
            this.laudos = [];
            
            if (response == null || response.length == 0) {
              this.messageService.warnInline('Vistoria(as) não localizada(as).');
            } else {
              this.laudos = response;
            }
          },
          error => {
              if(error.status == 400){
                  this.messageService.error('Recurso não encontrado');
              } else if (error.status > 400) {
                  this.messageService.error('Servidor não encontrado!');
              } else {
                this.messageService.warn('Nenhum resultado encontrado!');
              }
          }
      );
    }
  }

  buscarLaudoDadosBasicos(codigo :string){

    this.laudoService.obterLaudo(codigo).pipe(take(1)).subscribe(
      response => {
        this.laudofull = response;
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


  AtualizaLaudo(){
  
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
    this.alteraData = false;
  }


  ///*************    Desvincula laudo      *************//


        desvincularLaudo(codigo: string){

          return this.laudoService.desvincularLaudo(codigo).pipe(take(1)).subscribe(
            response => {
              response
              this.messageService.success('Laudo Desvinculado!');
            },
            error => {
              if(error.status == 400){
                this.messageService.error('Erro ao buscar dados básicos do laudo!');
              }else {
                this.messageService.error('Servidor não encontrado!');
              }
            }
          )

        }


  ///*************    Bloqueio de Laudo por Supervisão      *************//


        confirmaBloqueio(codigoLaudo:string){
          this.confirmationService.confirm({
            message: 'Confirmar o bloqueio do laudo? ',header:'Bloqueio de Laudo',
            accept: () => {
              this.laudoService.bloquearPorSupervisao(codigoLaudo).pipe(take(1)).subscribe(
                response => {
                  response
                  this.messageService.success("Laudo bloqueado por supervisão");
                }
              )
              this.pesquisar();
            }
        });
          
        }


///*************    Desbloqueio de Laudo icone verde      *************//



  telaDesbloqueioLaudo(codigo: string ){
    this.blockLaudo = true;
    this.laudoService.obterLaudo(codigo).pipe(take(1)).subscribe(
      response => {
        this.laudofull = response;
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


  desbloqueiaLaudo(laudo: LaudoFull){

    this.laudoService.desbloquerLaudo(laudo).pipe(take(1)).subscribe(
      response => {
        if(response.isBloqueado){
          this.messageService.error(response.menssagemBloqueado);
        }else{
          this.messageService.success(response.menssagemBloqueado);
        }
        this.blockLaudo=false;
        this.pesquisar();
      }, error =>{
      if(error.status == 400){
        this.messageService.error('Erro ao buscar dados básicos do laudo!');
      }else {
        this.messageService.error('Servidor não encontrado!');
      }
    }
      );
    
    }
 

  //************* Rota para Edição e Visualização de Laudo *************//


  
  editarLaudo(codigo: string ){
    this.router.navigate(['/laudo-vistoria/editar/' + codigo ], {state: {filtroLaudo:this.filtro}});
  } 

  visualizarLaudo(codigo: string ){
    this.router.navigate(['/laudo-vistoria/visualizar/' + codigo ], {state: {filtroLaudo:this.filtro}});
  } 





//*************     Altera data de vistoria     *************// 


  alterarData(codigo :string) {
    this.alteraData = true;
    this.laudoService.obterLaudo(codigo).pipe(take(1)).subscribe(
      response => {
        this.laudofull = response;

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



confirmaDesvinculo(codigoLaudo:string){
  
  this.confirmationService.confirm({
    message: 'Confirmar o desvinculo do laudo? ',header:'Desvincular de Laudo',
    accept: () => {

      this.laudoService.desvincularLaudo(codigoLaudo).pipe(take(1)).subscribe(
        response =>{
          response
          this.messageService.success("Laudo desvinculado com sucesso!")
        }
      )
      
      this.pesquisar();
    }
});
  
}

//*************     Exibir Logs do Laudo     *************// 


exibirLogVinculo(codigoLaudo:String){

  this.logsDetalhes = null;

  this.detalheLaudo = true;

  this.laudoService.obterLogVinculoLaudo(codigoLaudo).pipe(take(1)).subscribe(
    response => {
      this.logsDetalhes = response;
    },
    error =>{
    
    });
}


}
