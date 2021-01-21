import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageUtil } from '../../service/message-util.service';

import { ConteudoColunaTipoService } from './conteudo-coluna-tipo-service';
import { Dispensa } from './dispensa';
import { take } from 'rxjs/operators';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
    selector: 'dispensar',
    templateUrl: './dispensar.component.html'
})
export class DispensaComponent implements OnInit {
        
    selectItens: SelectItem[] = [];    
    dispensa: Dispensa;    

    constructor(private router: Router, private activatedRoute: ActivatedRoute, 
        private messageService: MessageUtil, private conteudoColunaTipoService: ConteudoColunaTipoService) {
        
        let codigoProposta = this.activatedRoute.snapshot.paramMap.get('codigoProposta');        
        let numeroItemSegurado = this.activatedRoute.snapshot.paramMap.get('numeroItemSegurado');
        let tipoFechamentoRestricao = this.activatedRoute.snapshot.paramMap.get('tipoFechamentoRestricao');

        this.dispensa =  new Dispensa;
        this.dispensa.codigoProposta = Number(codigoProposta);        
        this.dispensa.numeroItemSegurado = Number(numeroItemSegurado);
        this.dispensa.tipoFechamentoRestricao = Number(tipoFechamentoRestricao);
    }

    ngOnInit() {
        this.conteudoColunaTipoService.getMotivoDispensas().subscribe(
            response => {                
                response.forEach(
                    conteudoColunaTipo=> {
                        this.selectItens.push({label: conteudoColunaTipo.dsRmidaColunTipo, value: conteudoColunaTipo}) ;
                    }
                );                
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
            this.conteudoColunaTipoService.postSalvar(this.dispensa)
            .pipe(take(1))
            .subscribe(
                response => {
                    if(response) {
                        this.messageService.success('Dispensa de laudo realizada com sucesso!');
                        this.voltarPagina();
                    } else {
                        this.messageService.error('Erro ao dispensar laudo!');
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
        if(this.dispensa.codigoProposta <= 0 || this.dispensa.numeroItemSegurado <= 0){
            this.messageService.error('código endosso ou item segurado inválido!');
            return false;
        }

        if(this.dispensa.conteudoColunaTipo == null){
            this.messageService.error('Um motivo de dispensa deve ser selecionado!');
            return false;
        }

        if(this.dispensa.justificativaDispensa == null){
            this.messageService.error('Preencha o campo justificativa!');
            return false;
        }

        if(this.dispensa.tipoFechamentoRestricao == 3 || this.dispensa.tipoFechamentoRestricao == 1){            
        } else {
            this.messageService.error('Tipo do fechamento restrição inválido!');
            return false;
        }

        return true;
    }

    voltarPagina(){
        this.router.navigate(['/restricao-visualizar/' + this.dispensa.codigoProposta + '/' + this.dispensa.numeroItemSegurado]);
    }    
}