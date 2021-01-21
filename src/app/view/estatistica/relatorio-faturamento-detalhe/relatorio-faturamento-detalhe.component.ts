import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageUtil } from '../../../../app/service/message-util.service';
import { EstatisticaService } from '../estatistica.service';
import { PrestadoraVistoriaService } from '../../../../app/view/prestadora/prestadora-module/prestadora-vistoria-service';
import { DetalhamentoEstatisticaFaturamento } from '../../../../app/model/estatistica/DetalhamentoEstatisticaFaturamento';
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx';



@Component({
    selector: 'app-relatorio-faturamento-detalhe',
    templateUrl: './relatorio-faturamento-detalhe.component.html',
    styleUrls: ['./relatorio-faturamento-detalhe.component.css']
})
export class RelatorioFaturamentoDetalheComponent implements OnInit {

    nmPrestadora: string;
    loadedParams: any;
    filtro: any;
    detalheList: DetalhamentoEstatisticaFaturamento[] = [];
    loading: boolean;

    constructor(private estatisticaService: EstatisticaService, private prestadoraVisService: PrestadoraVistoriaService, private messageService: MessageUtil,
        private router: Router, private activatedRoute: ActivatedRoute) {
        
        this.loadedParams = this.activatedRoute.snapshot.queryParams;
        console.log('loadedParams', this.loadedParams);
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

    pesquisarDetalheEager() {
        this.estatisticaService
            .getDetalheEstatisticaFaturamentoEager(
                this.loadedParams.idPrestadora,
                `${this.loadedParams.month}${this.loadedParams.year}`,
                this.loadedParams.tipoLocalVistoria,
                this.loadedParams.distanciaKilometragem
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

    voltarPagina() {
        this.router.navigate(['/estatistica/relatorio-faturamento-resultado'], {
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
                'Vistoriador': item.cdVistoriador,
                'Numero Vistoria': item.codigoLaudo,
                'Data Realizacao': item.dataVistoria,
                'Data Transmissao': item.dataTransmissao,
                'Placa': item.numeroPlaca,
                'Chassi': item.numeroChassi,
                'Sucursal': item.codigoSucursal,
                'Postos / Domicílio': item.tipoLocalVistoria,
                'Km': item.kilometragem,
                'Cidade Destino': item.cidadeDestino,
                'UF': item.uf,
                'Num Voucher': item.numVoucher,
                'Status Vistoria': item.statusVoucher,
                'Produto': item.dsProduto
            }
        }) 
    }

    exportExcel() {
        const worksheet = XLSX.utils.json_to_sheet(this.createExportList());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "relatorio_faturamento_det");
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

}




