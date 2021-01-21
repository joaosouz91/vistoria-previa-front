import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalhamentoAtrasoTransmissaoTotal } from '../../../../app/model/estatistica/DetalhamentoAtrasoTransmissaoTotal';
import { MessageUtil } from '../../../../app/service/message-util.service';
import { EstatisticaService } from '../estatistica.service';
import { PrestadoraVistoriaService } from '../../../../app/view/prestadora/prestadora-module/prestadora-vistoria-service';
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx';


@Component({
    selector: 'app-atrasos-transmissao-detalhe-total',
    templateUrl: './atrasos-transmissao-detalhe-total.component.html',
    styleUrls: ['./atrasos-transmissao-detalhe-total.component.css']
})
export class AtrasosTransmissaoDetalheTotalComponent implements OnInit {

    nmPrestadora: string;
    loadedParams: any;
    filtro: any;
    detalheList: DetalhamentoAtrasoTransmissaoTotal[] = [];
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
        this.pesquisarDetalheTotal();
    }

    pesquisarDetalheTotal() {
        this.estatisticaService
            .getAtrasosTransmissaoDetalheTotal(
                this.loadedParams.idPrestadora,
                `${this.loadedParams.month}${this.loadedParams.year}`
            )
            .subscribe(
                response => {
                    console.log('response', response);
                    this.detalheList = response;
                    console.log('detalheList', this.detalheList);
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
        this.router.navigate(['/estatistica/atrasos-transmissao-resultado'], {
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
                'Código': item.codigoEmpresa,
                'Prestadora': item.nomeEmpresa,
                'Até 2 dias': item.quantidadeAteDois,
                'De 3 dias': item.quantidadeAteTres,
                'De 3 dias %': item.porcentagemAteTres,
                'Maior 3 dias': item.quantidadeMaiorTres,
                'Maior 3 dias %': item.porcentagemMaiorTres,
                'Total': item.totalRegistros
            }
        }) 
    }

    exportExcel() {
        const worksheet = XLSX.utils.json_to_sheet(this.createExportList());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "estatistica_atrasos_transmissao_det_total");
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

}




