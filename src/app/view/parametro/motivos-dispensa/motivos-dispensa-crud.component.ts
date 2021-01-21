import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MotivoDispensaService } from '../../../service/motivo-dispensa.service';
import { MessageUtil } from '../../../service/message-util.service';
import { ConteudoColunaTipo } from '../../../model/parametro/conteudo-coluna-tipo';


@Component({
    selector: 'app-motivos-dispensa-crud',
    templateUrl: './motivos-dispensa-crud.component.html',
    styleUrls: ['./motivos-dispensa-crud.component.css']
})
export class MotivoDispensaCrudComponent implements OnInit {

    @ViewChild(Table) dt: Table;

    loading: boolean = false;

    // Data Control
    avariasList: ConteudoColunaTipo[];
    filter: any;
    cols: any[];

    // Modal Control
    dialogHeaderText: string;
    modalId: string;
    modalDescricao: string;
    modalVisible: boolean = false;
    modalAddActive: boolean = false;
    modalEditActive: boolean = false;

    constructor(
        private motivoDispensaService: MotivoDispensaService,
        private messageService: MessageUtil) {

        this.filter = { 'descricao': null, 'inativo': false };
    }

    ngOnInit() {

        this.cols = [
            { field: 'vlCntdoColunTipo', header: 'ID', width: '15%' },
            { field: 'dsCoptaColunTipo', header: 'Descrição', width: '58%' }
        ]

        this.onPesquisar();
    }

    onPesquisar() {
        this.motivoDispensaService.findAll(
            this.filter.descricao != null ? this.filter.descricao : ''
        ).subscribe(
            response => {
                this.resetTable();
                this.avariasList = response;
            },
            error => {
                this.messageService.error('Servidor não encontrado!');
                console.log("Error: ", error);
                this.loading = false;
            }
        )
    }

    onClickConfirmar() {
        if (this.modalEditActive) {
            this.onUpdate()
        } else if (this.modalAddActive) {
            this.onCreate();
        }
    }

    onClickAdicionar() {

        this.modalId = null;
        this.modalDescricao = null;

        this.modalEditActive = false;
        this.modalAddActive = true;
        this.dialogHeaderText = "Criação de Registro"
        this.alterarStatusModal();
    }

    onUpdate() {
        const putObject = {
            'dsCoptaColunTipo' : this.modalDescricao
        }

        this.motivoDispensaService.update(this.modalId, putObject).subscribe(
            response => {
                console.log(response) 
                this.messageService.success('Motivo Dispensa atualizado com sucesso.');
                this.alterarStatusModal();
                this.onPesquisar();
            },
            error => {
                if(error.status == 400){
                    this.messageService.error('Preencher campos corretamente!');
                } else {
                    this.messageService.error('Erro no servidor.');
                    console.log("Error: ", error);
                }
                this.alterarStatusModal();
                this.onPesquisar();
            }
        )
    }

    onCreate() {
        const postObject = {
            'cdTipoAvari' : this.modalId,
            'dsCoptaColunTipo': this.modalDescricao
        }

        this.motivoDispensaService.create(postObject).subscribe(
            response => {
                console.log(response) 
                this.messageService.success('Motivo Dispensa cadastrado com sucesso.');
                this.alterarStatusModal();
                this.onPesquisar();
            },
            error => {
                if(error.status == 400){
                    this.messageService.error('Preencher campos corretamente!');
                } else {
                    this.messageService.error('Erro no servidor.');
                    console.log("Error: ", error);
                }
                this.alterarStatusModal();
                this.onPesquisar();
            }
        )
        
    }

    onClickEdit(event){

        this.modalId = event.vlCntdoColunTipo;
        this.modalDescricao = event.dsCoptaColunTipo;
        
        this.modalEditActive = true;
        this.modalAddActive = false;
        this.dialogHeaderText = "Edição de Registro"
        this.alterarStatusModal();

    }

    alterarStatusModal() {
        this.modalVisible = !this.modalVisible;
    }

    resetTable() {
        if (!this.dt.isEmpty()) {
            this.dt.reset();
        }
    }

}
