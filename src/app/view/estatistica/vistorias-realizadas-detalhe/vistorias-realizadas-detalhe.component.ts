import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstatisticaVistoriasRealizadas } from '../../../../app/model/estatistica/EstatisticaVistoriasRealizadas';
import { FiltroEstatisticaVistoriasRealizadas } from '../../../../app/model/estatistica/filtro/filtro-estatistica-vistorias-realizadas';
import { MessageUtil } from '../../../../app/service/message-util.service';
import { EstatisticaService } from '../estatistica.service';
import { LazyLoadEvent } from 'primeng/api';
import { PrestadoraVistoriaService } from '../../../../app/view/prestadora/prestadora-module/prestadora-vistoria-service';
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx';


@Component({
    selector: 'app-vistorias-realizadas-detalhe',
    templateUrl: './vistorias-realizadas-detalhe.component.html',
    styleUrls: ['./vistorias-realizadas-detalhe.component.css']
})
export class VistoriasRealizadasDetalheComponent implements OnInit {

    nmPrestadora: string;
    loadedParams: any;
    filtro: any;
    detalheList: EstatisticaVistoriasRealizadas[] = [];
    loading: boolean;

    constructor(private estatisticaService: EstatisticaService, private prestadoraVisService: PrestadoraVistoriaService, private messageService: MessageUtil,
        private router: Router, private activatedRoute: ActivatedRoute) {

        this.loadedParams = this.activatedRoute.snapshot.queryParams;

        this.filtro = {
            totalRegistros: 0,
            itensPorPagina: 10,
            pagina: 0
        };
    }

    ngOnInit(): void {
        this.pesquisarNomePrestadora(this.loadedParams.idPrestadora);
        this.pesquisarDetalheEager();
    }

    pesquisarDetalheLazy(pagina = 0) {
        this.filtro.pagina = pagina;
        this.estatisticaService
            .getVistoriasRealizadasDetalheLazy(
                this.loadedParams.idPrestadora,
                `${this.loadedParams.month}${this.loadedParams.year}`,
                this.loadedParams.situacao,
                this.filtro.pagina.toString(),
                this.filtro.itensPorPagina.toString(),
            )
            .subscribe(
                response => {
                    this.detalheList = response.content;
                    this.filtro.totalRegistros = response.totalElements;
                    this.loading = false;
                },
                error => {
                    this.messageService.error('Servidor não encontrado!');
                    console.log("Error: ", error);
                    this.loading = false;
                }
            );
    }

    pesquisarDetalheEager() {
        this.estatisticaService
            .getVistoriasRealizadasDetalheEager(
                this.loadedParams.idPrestadora,
                `${this.loadedParams.month}${this.loadedParams.year}`,
                this.loadedParams.situacao
            )
            .subscribe(
                response => {
                    this.detalheList = response.content;
                    this.loading = false;
                },
                error => {
                    this.messageService.error('Servidor não encontrado!');
                    console.log("Error: ", error);
                    this.loading = false;
                }
            );
    }

    pesquisarNomePrestadora(idPrestadora: number) {
        if (idPrestadora == 0) {
            this.nmPrestadora = "0 - TODAS AS PRESTADORAS";
            return false;
        }
        this.prestadoraVisService.getPrestadoraVistoria(idPrestadora)
            .subscribe(
                response => {
                    this.nmPrestadora = `${this.loadedParams.idPrestadora} - ${response.razaoSocial}`;
                },
                error => {
                    this.messageService.error('Servidor não encontrado!');
                    console.log("Error: ", error);
                    this.loading = false;
                });
    }

    loadLazy(event: LazyLoadEvent) {
        this.loading = true;
        this.filtro.itensPorPagina = event.rows;
        this.pesquisarDetalheLazy(event.first / event.rows);
    }

    voltarPagina() {
        this.router.navigate(['/estatistica/vistorias-realizadas-resultado'], {
            queryParams: {
                idPrestadora: this.loadedParams.idPrestadoraPesquisaInicial,
                month: this.loadedParams.month,
                year: this.loadedParams.year
            }
        });
    }

    createExportList() {
        return this.detalheList.map(item => {
            return {
                'Laudo' : item.codigoLaudo,
                'Placa' : item.numeroPlaca,
                'Chassi' : item.numeroChassi,
                'Data Realização' : item.dataRealizacao,
                'Data Transmissão' : item.dataTransmissao,
                'Cidade Origem' : item.cidadeOrigem,
                'Cidade Destino' : item.cidadeDestino,
                'UF' : item.uf,
                'Num Voucher' : item.numVoucher,
                'Status Vistoria' : item.statusVistoria
            }
        }) 
    }

    exportExcel() {
        const worksheet = XLSX.utils.json_to_sheet(this.createExportList());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "estatistica_vist_realizadas_det");
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

}




