import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageUtil } from '../../../../app/service/message-util.service';
import { EstatisticaService } from '../estatistica.service';
import { PrestadoraVistoriaService } from '../../../../app/view/prestadora/prestadora-module/prestadora-vistoria-service';
import { EstatisticaRelatorioFaturamentoDTO } from '../../../../app/model/estatistica/dto/EstatisticaRelatorioFaturamentoDTO';
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx';


@Component({
    selector: 'app-relatorio-faturamento-resultado',
    templateUrl: './relatorio-faturamento-resultado.component.html',
    styleUrls: ['./relatorio-faturamento-resultado.component.css']
})
export class RelatorioFaturamentoResultadoComponent implements OnInit {

    nmPrestadora: string;
    loadedParams: any;
    filtro: any;
    dto: EstatisticaRelatorioFaturamentoDTO = new EstatisticaRelatorioFaturamentoDTO();
    paramVP: any;
    loading: boolean;

    constructor(private estatisticaService: EstatisticaService, private prestadoraVisService: PrestadoraVistoriaService, private messageService: MessageUtil,
        private router: Router, private activatedRoute: ActivatedRoute) {
        
        this.loadedParams = this.activatedRoute.snapshot.queryParams;
        this.filtro = {
            totalRegistros : 0,
            itensPorPagina : 10,
            pagina : 0
        };

    }

    ngOnInit(): void {
        this.pesquisarNomePrestadora(this.loadedParams.idPrestadora);
        this.pesquisarResultadosEager();
    }

    pesquisarResultadosEager() {
        this.estatisticaService
            .getEstatisticaFaturamentoEager(
                this.loadedParams.idPrestadora, 
                `${this.loadedParams.month}${this.loadedParams.year}`
            )
            .subscribe(
                response => {
                    this.dto.estatisticaFaturamentoList = response.estatisticaFaturamentoList.content;
                    this.dto.linhaComTotal = response.linhaComTotal;
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
        if(idPrestadora == 0) {
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

    forwardDetalhe(idPrestadora: number, tipoLocalVistoria: string, distanciaKilometragem: number) {
        console.log("idPrestadora", idPrestadora, "tipoLocalVistoria", tipoLocalVistoria, "distanciaKilometragem", distanciaKilometragem);
        this.router.navigate(['/estatistica/relatorio-faturamento-detalhe'], {
            queryParams: {
                idPrestadoraPesquisaInicial: this.loadedParams.idPrestadora,
                month: this.loadedParams.month,
                year: this.loadedParams.year,
                idPrestadora: idPrestadora,
                tipoLocalVistoria: tipoLocalVistoria,
                distanciaKilometragem: distanciaKilometragem
            }
        });
    }

    voltarPagina(){
        this.router.navigate(['/estatistica/relatorio-faturamento']);
    }

    createExportList() {
        return this.dto.estatisticaFaturamentoList.map(item => {
            return {
                'Código' : item.codigoEmpresa,
                'Prestadora' : item.nomeEmpresa,
                'Mobile' : item.quantidadeMobile,
                'Posto Vistoriador' : item.quantidadePosto,
                'Domicílio' : item.quantidadeDomicilio,
                'Até 50 Km' : item.quantidadeDistKmPrimeiro,
                'De 51 a 100 Km' : item.quantidadeDistKmSegundo,
                'De 101 a 200 Km' : item.quantidadeDistKmTerceiro,
                'Maior de 200 Km' : item.quantidadeDistKmQuarto,
                'Total' : item.totalGeral
            };
        }) 
    }

    exportExcel() {
        const worksheet = XLSX.utils.json_to_sheet(this.createExportList());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "relatorio_faturamento_consolidado");
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

}




