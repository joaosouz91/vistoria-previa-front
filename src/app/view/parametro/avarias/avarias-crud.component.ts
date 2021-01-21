import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AvariasService } from '../../../service/avarias.service';
import { MessageUtil } from '../../../service/message-util.service';
import { AvariaVistoriaPrevia } from '../../../model/parametro/avaria-vistoria-previa';
import { SelectItem } from 'primeng/api';


@Component({
    selector: 'app-avarias-crud',
    templateUrl: './avarias-crud.component.html',
    styleUrls: ['./avarias-crud.component.css']
})
export class AvariasCrudComponent implements OnInit {

    @ViewChild(Table) dt: Table;

    loading: boolean = false;

    // Data Control
    avariasList: AvariaVistoriaPrevia[];
    filter: any;
    cols: any[];

    // screen objects
    dropDownAtivoInativo: SelectItem[] = []

    // Modal Control
    dialogHeaderText: string;
    modalTipo: string;
    modalDescricao: string;
    modalSituacao: string;
    modalVisible: boolean = false;
    modalAddActive: boolean = false;
    modalEditActive: boolean = false;

    constructor(
        private avariasService: AvariasService,
        private messageService: MessageUtil) {

        this.filter = { 'descricao': null, 'inativo': false };
    }

    ngOnInit() {

        this.dropDownAtivoInativo = [
            {'label' : '[todos]', 'value' : ''},
            {'label' : 'Ativo', 'value' : 'A'},
            {'label' : 'Inativo', 'value' : 'I'}
        ]

        this.cols = [
            { field: 'cdTipoAvari', header: 'Tipo Avaria', width: '15%' },
            { field: 'dsTipoAvari', header: 'Descrição', width: '58%' },
            { field: 'cdSitucAvari', header: 'Situação', width: '17%' }
        ]

        this.onPesquisar();
    }

    onPesquisar() {
        this.avariasService.findAll(
            this.filter.descricao != null ? this.filter.descricao : '',
            !this.filter.inativo ? "" : "I"
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

        this.modalTipo = null;
        this.modalDescricao = null;
        this.modalSituacao = null;

        this.modalEditActive = false;
        this.modalAddActive = true;
        this.dialogHeaderText = "Criação de Registro"
        this.alterarStatusModal();
    }

    onUpdate() {
        const putObject = {
            'cdSitucAvari': this.modalSituacao,
            'dsTipoAvari' : this.modalDescricao
        }

        this.avariasService.update(this.modalTipo, putObject).subscribe(
            response => {
                console.log(response) 
                this.messageService.success('Avaria atualizada com sucesso.');
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
            'cdTipoAvari' : this.modalTipo,
            'cdSitucAvari': this.modalSituacao,
            'dsTipoAvari' : this.modalDescricao
        }

        this.avariasService.create(postObject).subscribe(
            response => {
                console.log(response) 
                this.messageService.success('Avaria cadastrada com sucesso.');
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

        this.modalTipo = event.cdTipoAvari;
        this.modalDescricao = event.dsTipoAvari;
        this.modalSituacao = event.cdSitucAvari;
        
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

    clone(o: AvariaVistoriaPrevia): AvariaVistoriaPrevia {
        let obj = new AvariaVistoriaPrevia();
        for (let prop in o) {
            obj[prop] = o[prop];
        }
        return obj;
    }

}
