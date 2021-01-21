import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageUtil } from '../../../../app/service/message-util.service';
import { EstatisticaService } from '../estatistica.service';
import { LazyLoadEvent } from 'primeng/api';
import { PrestadoraVistoriaService } from '../../../../app/view/prestadora/prestadora-module/prestadora-vistoria-service';
import { AtrasoTransmissaoAgrupamento } from '../../../../app/model/estatistica/AtrasoTransmissaoAgrupamento';


@Component({
    selector: 'app-atrasos-transmissao-resultado',
    templateUrl: './atrasos-transmissao-resultado.component.html',
    styleUrls: ['./atrasos-transmissao-resultado.component.css']
})
export class AtrasosTransmissaoResultadoComponent implements OnInit {

    nmPrestadora: string;
    loadedParams: any;
    filtro: any;
    atrasoTransmissaoAgrupamentoList: AtrasoTransmissaoAgrupamento[] = [];
    linhaComTotal: AtrasoTransmissaoAgrupamento;
    paramVP: any;
    loading: boolean;

    constructor(private estatisticaService: EstatisticaService, private prestadoraVisService: PrestadoraVistoriaService, private messageService: MessageUtil,
        private router: Router, private activatedRoute: ActivatedRoute) {

        this.loadedParams = this.activatedRoute.snapshot.queryParams;
        this.linhaComTotal = null;
        this.filtro = {
            totalRegistros : 0,
            itensPorPagina : 10,
            pagina : 0
        };

    }

    ngOnInit(): void {
        this.pesquisarNomePrestadora(this.loadedParams.idPrestadora);
        this.pesquisarParamVP();
        this.pesquisarResultadosEager();
    }

    pesquisarParamVP() {
        this.estatisticaService
            .getParamVistoriaPrevia()
            .subscribe(
                response => {
                    this.paramVP = response;
                },
                error => {
                    this.messageService.error('Servidor não encontrado!');
                    console.log("Error: ", error);
                    this.loading = false;
                }
            );
    }

    pesquisarResultadosEager() {
        this.estatisticaService
            .getAtrasosTransmissaoAgrupamentoEager(
                this.loadedParams.idPrestadora, 
                `${this.loadedParams.month}${this.loadedParams.year}`
            )
            .subscribe(
                response => {
                    console.log('response', response);
                    this.atrasoTransmissaoAgrupamentoList = response.atrasoTransmissaoAgrupamentoPageableList.content;
                    this.linhaComTotal = response.linhaComTotal;
                    console.log('linhaComTotal', this.linhaComTotal)
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

    forwardDetalhe(idPrestadora: number, diaInicio: number, diaFim: number) {
        console.log("idPrestadora", idPrestadora, "diaInicio", diaInicio, "diaFim", diaFim);
        this.router.navigate(['/estatistica/atrasos-transmissao-detalhe'], {
            queryParams: {
                idPrestadoraPesquisaInicial: this.loadedParams.idPrestadora,
                idPrestadora: idPrestadora,
                month: this.loadedParams.month,
                year: this.loadedParams.year,
                diaInicio: diaInicio,
                diaFim: diaFim
            }
        });
    }

    forwardDetalheTotal(idPrestadora: number) {
        console.log("idPrestadora", idPrestadora);
        this.router.navigate(['/estatistica/atrasos-transmissao-detalhe-total'], {
            queryParams: {
                idPrestadoraPesquisaInicial : this.loadedParams.idPrestadora,
                idPrestadora: idPrestadora,
                month: this.loadedParams.month, 
                year: this.loadedParams.year
            }
        });
    }

    voltarPagina(){
        this.router.navigate(['/estatistica/atrasos-transmissao']);
    }

}




