import { Component, OnInit, EventEmitter } from '@angular/core';
import { RestricaoFiltro } from './restricao-filtro';
import { Router, ActivatedRoute } from '@angular/router';
import { DetalheDoItemService } from './detalhe-do-item-service';
import { DetalheDoItem } from './detalhe-do-item';

import { MessageUtil } from '../../service/message-util.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'restricao-visualizar',
    templateUrl: './restricao-visualizar.component.html'
})
export class RestricaoVisualizarComponent implements OnInit {

    retricaoFiltro: RestricaoFiltro;
    detalheDoItem: DetalheDoItem;
    detalheDoItems: DetalheDoItem[];

    mudarCordaFontPlacaChassi: string;    
    mudarCordaFontCpfCnpj: string;
    mudarCordaFontFabricante: string;
    mudarCordaFontCodigoModelo: string;
    mudarCordaFontAnoModelo: string;
    mudarCordaFontCombustivel: string;
    
    liberarBotaoDispensa: boolean;
    liberarBotaoReclassificar: boolean;
    liberarBotaoLiberarDivergencia: boolean;
    liberarBotaoDetalheLaudo: boolean;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private detalheDoItemService: DetalheDoItemService, private messageService: MessageUtil) {
        
        let codigoProposta = this.activatedRoute.snapshot.paramMap.get('codigoProposta');        
        let numeroItemSegurado = this.activatedRoute.snapshot.paramMap.get('numeroItemSegurado');

        this.retricaoFiltro = new RestricaoFiltro;        
        this.retricaoFiltro.codigoProposta = Number(codigoProposta);        
        this.retricaoFiltro.numeroItemSegurado = Number(numeroItemSegurado);
       
        this.detalheDoItems = [];
        this.detalheDoItem = new DetalheDoItem;
        
        this.mudarCordaFontPlacaChassi = '';        
        this.mudarCordaFontCpfCnpj = '';
        this.mudarCordaFontFabricante = '';
        this.mudarCordaFontCodigoModelo = '';
        this.mudarCordaFontAnoModelo = '';
        this.mudarCordaFontCombustivel = '';
        
        this.liberarBotaoDispensa = false;
        this.liberarBotaoReclassificar = false;
        this.liberarBotaoLiberarDivergencia = false;
        this.liberarBotaoDetalheLaudo = false;
    }

    ngOnInit() {
        this.detalheDoItemService.getRestricoes(this.retricaoFiltro)
        .pipe(take(1)).subscribe(
            response => {
                this.detalheDoItem = response;                
                this.mudarCordaFont(this.detalheDoItem);
                this.detalheDoItems.push(this.detalheDoItem);
            },
            error => {
                if(error.status == 400){
                    this.messageService.error('Preencher campos corretamente!');
                } else {
                    this.messageService.error('Servidor não encontrado!');                 
                }                
            }
        );        
    }
    
    mudarCordaFont(detalheDoItem: DetalheDoItem){        
        if(this.detalheDoItem != null){            
            if(this.detalheDoItem.codigoLaudo == null && this.detalheDoItem.codigoSituacaoRestricao == 'GRD' && this.detalheDoItem.liberarDispensaAlcada == true){
                this.liberarBotaoDispensa = true;
            }

            if((this.detalheDoItem.codigoSituacaoRestricao == 'PEN' && this.detalheDoItem.codigoSituacaoGrade == 'VP2' && this.detalheDoItem.liberarDispensaAlcada == true) 
            || (this.detalheDoItem.codigoSituacaoRestricao == 'PEN' && this.detalheDoItem.codigoSituacaoGrade == 'VP3' && this.detalheDoItem.liberarDispensaAlcada == true)) {
                this.liberarBotaoReclassificar = true; 
            }

            if(this.detalheDoItem.codigoSituacaoRestricao == 'PEN' && this.detalheDoItem.codigoSituacaoGrade == 'VP1' && this.detalheDoItem.liberarDispensaAlcada == true) {
                this.liberarBotaoLiberarDivergencia = true; 
            }

            if(this.detalheDoItem.propostaPlaca != this.detalheDoItem.laudoPlaca || this.detalheDoItem.propostaChassi != this.detalheDoItem.laudoChassi){
                this.mudarCordaFontPlacaChassi = 'red'
            }
            
            if(this.detalheDoItem.propsotaClienteCpfCnpj != this.detalheDoItem.laudoCpfCnpjCrlv){
                this.mudarCordaFontCpfCnpj = 'red'
            }

            if(this.detalheDoItem.propostaCodFabricante != this.detalheDoItem.laudoCodFabricante){
                this.mudarCordaFontFabricante = 'red'
            }

            if(this.detalheDoItem.propostaCodModelo != this.detalheDoItem.laudoCodModelo){
                this.mudarCordaFontCodigoModelo = 'red'
            }

            if(this.detalheDoItem.propostaAnoFabricante != this.detalheDoItem.laudoAnoModelo){
                this.mudarCordaFontAnoModelo = 'red'
            }

            if(this.detalheDoItem.propostaCodCombustivel != this.detalheDoItem.laudoCodCombustivel){
                this.mudarCordaFontCombustivel = 'red'
            }
        }    
    }

    botaoDetalheLaudo(){
        window.open(this.detalheDoItem.urlLinkDetalhe,
        "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=50,left=75,width=1200,height=600");
    }

    abrirNovaPopupBotaoConsultarVistorias(){
        window.open(this.detalheDoItem.urlAmbiente, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=50,left=75,width=1200,height=600");
    }

    botaoDispensar() {        
        this.router.navigate(['/dispensar/' + this.retricaoFiltro.codigoProposta + '/' + this.retricaoFiltro.numeroItemSegurado + '/' + this.detalheDoItem.tipoFechamentoRestricao]);
    }

    botaoDivergencia() {        
        this.router.navigate(['/divergencia/' + this.retricaoFiltro.codigoProposta + '/' + this.retricaoFiltro.numeroItemSegurado + '/' + this.detalheDoItem.tipoFechamentoRestricao]);
    }

    botaoReclassificacao() {        
        this.router.navigate(['/reclassificacao/' + this.retricaoFiltro.codigoProposta + '/' + this.retricaoFiltro.numeroItemSegurado + '/' + this.detalheDoItem.tipoFechamentoRestricao]);
    }

    botaoSitePrestadora() {        
        window.open(this.detalheDoItem.sitePrestadora, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=800,height=600");
    }
}