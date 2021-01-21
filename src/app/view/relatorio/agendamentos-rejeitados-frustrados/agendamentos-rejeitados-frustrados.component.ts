import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageUtil } from '../../../service/message-util.service';
import { SelectItem } from 'primeng/api';
import { RelatorioAgendamentoService } from '../../../service/relatorio-agendamentos.service';
import { RelatorioAgendamentoFilter } from '../../../model/relatorio/filtro/RelatorioAgendamentoFilter';
import { RelatorioAgendamento } from '../../../model/relatorio/relatorio-agendamento';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-agendamentos-rejeitados-frustrados',
    templateUrl: './agendamentos-rejeitados-frustrados.component.html',
    styleUrls: ['./agendamentos-rejeitados-frustrados.component.scss']
})
export class AgendamentosRejeitadosFrustradosComponent implements OnInit {

    prestadoras: SelectItem[] = [];
    situacoesVistoria: SelectItem[] = [];
    relatorioAgendamento: RelatorioAgendamento[] = [];
    filter: RelatorioAgendamentoFilter = new RelatorioAgendamentoFilter();
    loading: boolean;

    constructor(private router: Router, private relatorioAgendamentoService: RelatorioAgendamentoService, private messageService: MessageUtil, private datepipe: DatePipe) { 

    }

    ngOnInit() {
        this.relatorioAgendamentoService.getPrestadoras(true).subscribe(
            response => {
                response.sort((a, b) => a.cdAgrmtVspre - b.cdAgrmtVspre);
                this.prestadoras.push({ label: `[TODAS]`, value: 0 })
                response.forEach(
                    prestadoraVistoria => {
                        this.prestadoras.push({
                            label: `${prestadoraVistoria.cdAgrmtVspre} - ${prestadoraVistoria.nmRazaoSocal}`,
                            value: prestadoraVistoria.cdAgrmtVspre
                        });
                    }
                );
            },
            error => {
                this.messageService.error('Servidor não encontrado!');
                console.log("Error: ", error);
            }
        );

        this.relatorioAgendamentoService.getSituacoesVistoria().subscribe(
            response => {
                this.situacoesVistoria.push({ label: `[TODAS]`, value: '' })
                console.log(response);
                response.forEach(
                    reg => {
                        console.log(reg);
                        this.situacoesVistoria.push({ label: (Object.values(reg)[0]).toString(), value: Object.keys(reg)[0] })
                    }
                );
                console.log('this.sitacoesVistoria', this.situacoesVistoria);
            },
            error => {
                this.messageService.error('Servidor não encontrado!');
                console.log("Error: ", error);
            }
        );
    }

    onPesquisar() {
        if(!this.validatePeriod()) return false;
        this.relatorioAgendamento = null;
        this.relatorioAgendamentoService.getRelatorioRejeitadosFrustradosEager(
            this.filter.numVoucher != null ? this.filter.numVoucher : '',
            this.filter.codCorretor != null ? this.filter.codCorretor : 0,
            this.filter.idPrestadora != null ? this.filter.idPrestadora : 0,
            this.filter.codSitVistoria != null ? this.filter.codSitVistoria : '',
            this.transformDate(this.filter.periodo[0]),
            this.transformDate(this.filter.periodo[1]),
        ).subscribe(
            response => {
                console.log('response', response);
                this.relatorioAgendamento = response.content;
                this.loading = false;
            },
            error => {
                this.messageService.error('Servidor não encontrado!');
                console.log("Error: ", error);
                this.loading = false;
            }
        );

    }

    validatePeriod(){

        if(this.filter.periodo == undefined || this.filter.periodo[0] == null || this.filter.periodo[1] == null) {
            this.messageService.error('Escolha um período de datas.')
            return false;
        }
        
        let dataInicial = this.filter.periodo[0];
        let dataFinal = this.filter.periodo[1];
        let totalDays = 1 + Math.floor((Date.UTC(dataFinal.getFullYear(), dataFinal.getMonth(), dataFinal.getDate()) - Date.UTC(dataInicial.getFullYear(), dataInicial.getMonth(), dataInicial.getDate()) ) /(1000 * 60 * 60 * 24));
        
        if(Math.abs(totalDays) > 31){
            this.messageService.error('Escolha um período válido de até 31 dias corridos.')
            return false;
        }

        return true;
        
    }

    transformDate(date: Date) {
        return this.datepipe.transform(date, 'dd/MM/yyyy');
    }

    onChangePeriodo() {
        console.log('this.filter', this.filter);
    }

    createExportList() {
        return this.relatorioAgendamento.map(item => {
            return {
                'Voucher': `${item.cdVouch}|Ant: ${item.cdVouchAnter != null ? item.cdVouchAnter : ''}|Reag: ${item.cdVouchPosterior != null ? item.cdVouchPosterior : ''}`,
                'Corretor': item.codNomeCorretor,
                'Prestadora': item.nmRazaoSocialPrta,
                'Situação': item.dsSitucAgend,
                'Motivo': item.cdSitucAgmto == 'VFR' ? item.dsMotvVstriFruda : item.dsMotvSitucAgmto,
                'Data Emissão': item.dtUltmaAlterAgto
            }
        }) 
    }

    exportExcel() {
        const worksheet = XLSX.utils.json_to_sheet(this.createExportList());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "relatorio_agendamentos_rejeit_frust");
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }


}
