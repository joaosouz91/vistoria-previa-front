import { Component, OnInit, HostListener, ViewChild, Input } from '@angular/core';
import { PecasService } from '../../../service/pecas.service';
import { MessageUtil } from '../../../service/message-util.service';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-pecas-crud',
    templateUrl: './pecas-crud.component.html',
    styleUrls: ['./pecas-crud.component.css']
})
export class PecasCrudComponent implements OnInit {

    @ViewChild(Table) dt: Table;

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        console.log(event)
        if (event.code == "Enter") {
            this.onPesquisar();
        }
    }

    loading: boolean;

    // Modal Control
    dialogHeaderText: string;
    modalId: number;
    modalDescricao: string;
    modalSituacao: string;
    modalVisible: boolean = false;
    modalAddActive: boolean = false;
    modalEditActive: boolean = false;

    // Data Control
    pecasList: any;
    filter: any;

    constructor(
        private pecasService: PecasService,
        private messageService: MessageUtil) {

        this.filter = { 'descricao': null, 'inativo': false };
    }

    ngOnInit() {
        this.onPesquisar();
    }

    onPesquisar() {
        this.pecasService.findAll(
            this.filter.descricao != null ? this.filter.descricao : '',
            !this.filter.inativo ? "" : "I"
        ).subscribe(
            response => {
                this.resetTable();
                this.pecasList = response;
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

    onUpdate() {
        const postUpdateObject = {
            'cdSitucPeca': this.modalSituacao,
            'dsPecaAvada' : this.modalDescricao
        }

        this.pecasService.update(this.modalId, postUpdateObject).subscribe(
            response => {
                console.log(response) 
                this.messageService.success('Peça atualizada com sucesso.');
                this.alterarStatusModal();
                this.limparFiltros()
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
        const postCriarObject = {
            'cdSitucPeca': this.modalSituacao,
            'dsPecaAvada' : this.modalDescricao
        }

        this.pecasService.create(postCriarObject).subscribe(
            response => {
                console.log(response) 
                this.messageService.success('Peça cadastrada com sucesso.');
                this.alterarStatusModal();
                this.limparFiltros()
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

    limparFiltros() {
        this.filter.descricao = null;
        this.filter.inativo = false;
    }

    onClickAdicionar() {

        if(this.filter.descricao == null || this.filter.descricao.trim() == "") {
            this.messageService.error("Insira uma descrição antes de gravar um novo registro.");
            return;
        }

        this.modalId = null;
        this.modalDescricao = this.filter.descricao;
        this.modalSituacao = !this.filter.inativo ? 'A' : 'I';
        this.modalEditActive = false;
        this.modalAddActive = true;
        this.dialogHeaderText = "Confirma a criação do registro?"
        this.alterarStatusModal();
    }

    onClickEdit(id: number, descricao: string, situacao: string) {
        this.modalId = id;
        this.modalDescricao = descricao;
        this.modalSituacao = situacao;
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
