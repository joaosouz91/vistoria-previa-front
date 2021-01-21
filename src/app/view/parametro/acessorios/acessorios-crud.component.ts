import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageUtil } from '../../../service/message-util.service';
import { AcessorioVistoriaPrevia } from '../../../model/parametro/acessorio-vistoria-previa';
import { AcessoriosService } from '../../../service/acessorios.service';
import { SelectItem } from 'primeng/api';


@Component({
    selector: 'acessorios-dispensa-crud',
    templateUrl: './acessorios-crud.component.html',
    styleUrls: ['./acessorios-crud.component.css']
})
export class AcessoriosCrudComponent implements OnInit {

    @ViewChild(Table) dt: Table;

    loading: boolean = false;

    // Data Control
    acessorioList: AcessorioVistoriaPrevia[];
    filter: any;
    cols: any[];

    // Screen objects
    dropDownAtivoInativo: SelectItem[] = []
    dropDownTipoItem: SelectItem[] = []

    // Modal Control
    dialogHeaderText: string;
    modalId: number;
    modalDescricao: string;
    modalSituacao: string;
    modalTipo: string;
    modalVisible: boolean = false;
    modalAddActive: boolean = false;
    modalEditActive: boolean = false;

    constructor(
        private acessoriosService: AcessoriosService,
        private messageService: MessageUtil) {

        this.filter = { 'descricao': null, 'inativo': false };
    }

    ngOnInit() {

        this.dropDownTipoItem = [
            {'label' : '[Todos]', 'value' : ''},
            {'label' : 'Acessório', 'value' : 'A'},
            {'label' : 'Item de Segurança', 'value' : 'S'},
            {'label' : 'Equipamento', 'value' : 'E'}
        ]

        this.dropDownAtivoInativo = [
            {'label' : '[Todos]', 'value' : ''},
            {'label' : 'Ativo', 'value' : 'A'},
            {'label' : 'Inativo', 'value' : 'I'}
        ]

        this.cols = [
            { field: 'cdAcsroVspre', header: 'ID', width: '15%' },
            { field: 'dsAcsroVspre', header: 'Descrição', width: '30%' },
            { field: 'tpAcsroVspre', header: 'Tipo Acessório', width: '30%' },
            { field: 'cdSitucAcsroVspre', header: 'Situação', width: '25%' }
        ]

        this.onPesquisar();
    }

    onPesquisar() {
        this.acessoriosService.findAll().subscribe(
            response => {
                this.resetTable();
                this.acessorioList = response;
                if(this.acessorioList.length > 0) {
                    this.acessorioList.sort((a, b) => a.cdAcsroVspre - b.cdAcsroVspre);
                }
            },
            error => {
                this.messageService.error('Servidor não encontrado!');
                console.log("Error: ", error);
                this.loading = false;
            }
        )
    }

    onUpdate() {
        const putObject = {
            'cdSitucAcsroVspre' : this.modalSituacao,
            'tpAcsroVspre': this.modalTipo,
            'dsAcsroVspre' : this.modalDescricao
        }

        this.acessoriosService.update(this.modalId, putObject).subscribe(
            response => {
                console.log(response) 
                this.messageService.success('Acessório Vistoria Prévia atualizado com sucesso.');
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
            'cdSitucAcsroVspre' : this.modalSituacao,
            'tpAcsroVspre': this.modalTipo,
            'dsAcsroVspre' : this.modalDescricao
        }

        this.acessoriosService.create(postObject).subscribe(
            response => {
                console.log(response) 
                this.messageService.success('Acessório Vistoria Prévia cadastrado com sucesso.');
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
        this.modalSituacao = null;
        this.modalTipo = null;

        this.modalEditActive = false;
        this.modalAddActive = true;
        this.dialogHeaderText = "Criação de Registro"
        this.alterarStatusModal();
    }

    onClickEdit(event){

        this.modalId = event.cdAcsroVspre;
        this.modalDescricao = event.dsAcsroVspre;
        this.modalSituacao = event.cdSitucAcsroVspre;
        this.modalTipo = event.tpAcsroVspre;
        
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
