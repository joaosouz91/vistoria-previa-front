import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageUtil } from '../../service/message-util.service';

import { Dispensa } from '../dispensa/dispensa';

import { RestricaoFiltro } from '../restricao/restricao-filtro';
import { ReclassificacaoService } from './reclassificacao-service';
import { Reclassificacao } from './reclassificacao';
import { ComboNovoStatus } from './combo-novo-status';
import { SelectItem } from 'primeng/api/selectitem';
import { ReclassificacaoAlterarStatus } from './reclassificacao-alterar-status';
import { take } from 'rxjs/operators';

@Component({
    selector: 'reclassificacao',
    templateUrl: './reclassificacao.component.html'
})
export class ReclassificacaoComponent implements OnInit {
    
    dispensa: Dispensa;
    restricaoFiltro: RestricaoFiltro;
    reclasificacao: Reclassificacao;
    selectItens: SelectItem[] = [];
    
    reclassificacaoAlterarStatus: ReclassificacaoAlterarStatus;
    comboNovoStatus: ComboNovoStatus;
    justificativa: string;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, 
        private messageService: MessageUtil, private reclassificacaoService: ReclassificacaoService) {
        let codigoProposta = this.activatedRoute.snapshot.paramMap.get('codigoProposta');        
        let numeroItemSegurado = this.activatedRoute.snapshot.paramMap.get('numeroItemSegurado');
        let tipoFechamentoRestricao = this.activatedRoute.snapshot.paramMap.get('tipoFechamentoRestricao');

        this.reclasificacao = new Reclassificacao;

        this.dispensa =  new Dispensa;
        this.dispensa.codigoProposta = Number(codigoProposta);
        this.dispensa.numeroItemSegurado = Number(numeroItemSegurado);
        this.dispensa.tipoFechamentoRestricao = Number(tipoFechamentoRestricao);
        
        this.restricaoFiltro = new RestricaoFiltro;
        this.reclassificacaoAlterarStatus = new ReclassificacaoAlterarStatus;
        this.comboNovoStatus = new ComboNovoStatus;
        this.justificativa = "";
    }

    ngOnInit() {
        this.restricaoFiltro.codigoProposta = this.dispensa.codigoProposta;
        this.restricaoFiltro.numeroItemSegurado = this.dispensa.numeroItemSegurado;

        this.reclassificacaoService.getReclassificacao(this.restricaoFiltro)
        .subscribe(
            response => {
                this.reclasificacao = response;                
                this.reclasificacao.comboNovoStatusList.forEach(
                    combo=> {
                        this.selectItens.push({label: combo.nome, value: combo});
                    }
                );
                this.comboNovoStatus = this.reclasificacao.comboNovoStatusList[0];
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

    salvar(){
        if(this.validacaoDosCampos()){            
            this.reclassificacaoService.postSalvarReclassificacao(this.reclassificacaoAlterarStatus)
            .pipe(take(1)).subscribe(
                response => {
                    if(response) {
                        this.messageService.success('Reclassificação de laudo realizada com sucesso!');
                        this.voltarPagina();
                    } else {
                        this.messageService.error('Erro ao reclassificar laudo!');
                    }                
                },
                error => {
                    if(error.status == 400){
                        this.messageService.error('Preencher campos corretamente!');
                    } else {
                        this.messageService.error('Servidor não encontrado!');
                        console.log("Error: ", error);
                    }
                }
            );
        }
    }

    validacaoDosCampos() : boolean{
        this.reclassificacaoAlterarStatus.numeroItem = this.dispensa.numeroItemSegurado;
        this.reclassificacaoAlterarStatus.numeroLaudo = this.reclasificacao.vistoria;
        this.reclassificacaoAlterarStatus.tipoHistorico = this.reclasificacao.tipoHistorico;
        this.reclassificacaoAlterarStatus.versaoLaudo = this.reclasificacao.versaoLaudo;
        this.reclassificacaoAlterarStatus.codigoProposta = this.dispensa.codigoProposta;
        this.reclassificacaoAlterarStatus.comboNovoStatus = this.comboNovoStatus;
        this.reclassificacaoAlterarStatus.justificativa = this.justificativa;
        this.reclassificacaoAlterarStatus.tipoFechamentoRestricao = this.dispensa.tipoFechamentoRestricao;

        if(this.reclassificacaoAlterarStatus.comboNovoStatus == null || this.reclassificacaoAlterarStatus.comboNovoStatus.codigo == null){
            this.messageService.error('Um novo status deve ser selecionado!');
            return false;
        }

        if(this.reclassificacaoAlterarStatus.justificativa == null || this.reclassificacaoAlterarStatus.justificativa == ''){
            this.messageService.error('Preencha o campo justificativa!');
            return false;
        }

        return true;
    }

    voltarPagina(){
        this.router.navigate(['/restricao-visualizar/' + this.dispensa.codigoProposta + '/' + this.dispensa.numeroItemSegurado]);
    }    
}