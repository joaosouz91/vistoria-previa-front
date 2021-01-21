import { Component, OnInit } from '@angular/core';
import { MessageUtil } from '../../../service/message-util.service';
import { SelectItem } from 'primeng/api';
import { RelatorioAgendamentoService } from '../../../service/relatorio-agendamentos.service';
import { CorretorService } from '../../../service/corretor-service';
import { Corretor } from '../../../model/corretor';

@Component({
    selector: 'app-agendamentos-status-local',
    templateUrl: './agendamentos-status-local.component.html',
    styleUrls: ['./agendamentos-status-local.component.css']
})
export class AgendamentosStatusLocalComponent implements OnInit {

    codCorretor: number = null;
    date: any;
    requiredFilled: boolean = false;
    modalCorretorVisible: boolean = false;
    tipoPesquisaCorretor: string;
    corretorList: Corretor[] = [];
    agendamentosStatusLocalList: any;
    filtroCorretorModal: Corretor;
    inputCorretor: string;
    selectedCorretor: Corretor;
    termoPesquisaCorretor: string;
    comboTipoPesquisaCorretor: SelectItem[] = [{ label: 'Código', value: 'C' }, { label: 'Nome', value: 'N' }];
    loading: boolean;

    constructor(
        private corretorService: CorretorService,
        private relatorioAgendamentoService: RelatorioAgendamentoService,
        private messageService: MessageUtil
    ) { 
        this.filtroCorretorModal = new Corretor();

    }

    ngOnInit() {

        this.tipoPesquisaCorretor = "C";

    }

    onPesquisar() {
        this.relatorioAgendamentoService.getAgendamentosStatusLocal(
            this.codCorretor,
            `${this.date.month}${this.date.year}`
        ).subscribe(
            response => {
                console.log('response', response);
                this.agendamentosStatusLocalList = response;
                this.loading = false;
            },
            error => {
                this.messageService.error('Servidor não encontrado!');
                console.log("Error: ", error);
                this.loading = false;
            }
        );
    }

    onPesquisarCorretor() {
        if (!this.beforeSearchCorretor()) return false;
        this.corretorService.postPesquisaCorretor(this.filtroCorretorModal).subscribe(
            response => { 
                this.corretorList = response;
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

    beforeSearchCorretor(){

        if(this.termoPesquisaCorretor == null || this.termoPesquisaCorretor.trim() == "") {
            this.messageService.error('Digite um termo para efetuar a pesquisa.');
            return false;
        }

        if(this.tipoPesquisaCorretor === "N" && this.isNumeric(this.termoPesquisaCorretor)) {
            this.messageService.error('Não são aceitáveis somente números numa pesquisa por [Nome]');
            return false;
        }

        if(this.tipoPesquisaCorretor === "C" && !this.isNumeric(this.termoPesquisaCorretor)) {
            this.messageService.error('Não são aceitáveis caracteres alfabéticos numa pesquisa por [Código]');
            return false;
        }

        this.filtroCorretorModal = new Corretor();

        if(this.tipoPesquisaCorretor === "N") {
            this.filtroCorretorModal.nomeCorretor = this.termoPesquisaCorretor;
        } else {
            this.filtroCorretorModal.idCorretor = parseInt(this.termoPesquisaCorretor);
        }
        
        return true;
        
    }

    onRowSelectCorretor(event) {
        console.log(event);
        this.inputCorretor = `${event.data.idCorretor} - ${event.data.nomeCorretor}`;
        this.codCorretor = event.data.idCorretor;
        this.changeModalVisibility();
        this.cleanModalResults();
        this.isRequiredFilled();
    }

    updateSelectedDate(date) {
        this.date = date;
        this.isRequiredFilled();
    }

    changeModalVisibility() {
        this.modalCorretorVisible = !this.modalCorretorVisible;
    }

    cleanModalResults() {
        this.corretorList = null;
        this.filtroCorretorModal = new Corretor();
        this.termoPesquisaCorretor = null;
    }

    isRequiredFilled() {
        if (this.date.year > 0 && this.date.month > 0 && this.codCorretor != null) {
            this.requiredFilled = true;
        } else {
            this.requiredFilled = false;
        }
    }

    traduzirStatus(cdSitucAgmto: any) {

        return cdSitucAgmto
                    .replaceAll("PEN", "Não Recebida")
                    .replaceAll("RCB", "Recebida")
                    .replaceAll("AGD", "Agendada")
                    .replaceAll("RLZ", "Realizada")
                    .replaceAll("FIM", "Finalizada")
                    .replaceAll("RGD", "Reagendada")
                    .replaceAll("VFR", "Frustrada")
                    .replaceAll("NAP", "Não Aprovada")
                    .replaceAll("CAN", "Cancelada")
                    .replaceAll("NAG", "Não Agendada")
                    .replaceAll("FTR", "Fotos Recepcionadas")
                    .replaceAll("PEF", "Pendência de Fotos")
                    .replaceAll("LKX", "Link Expirado")
                    .replaceAll("FTT", "Foto Transmitida");
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

}
