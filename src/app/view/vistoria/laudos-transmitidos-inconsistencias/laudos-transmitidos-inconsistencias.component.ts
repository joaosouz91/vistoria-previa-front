import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageUtil } from '../../../service/message-util.service';
import { VistoriaService } from '../vistoria.service';
import { PrestadoraVistoriaService } from '../../prestadora/prestadora-module/prestadora-vistoria-service';


@Component({
    selector: 'app-laudos-transmitidos-inconsistencias',
    templateUrl: './laudos-transmitidos-inconsistencias.component.html',
    styleUrls: ['./laudos-transmitidos-inconsistencias.component.css']
})
export class LaudosTransmitidosInconsistenciaComponent implements OnInit {

    nmPrestadora: string;
    idRecepcaoLaudo: string;
    loadedParams: any;
    filtro: any;
    inconsistenciaList: any[] = [];
    loading: boolean;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute, 
        private messageService: MessageUtil, 
        private vistoriaService: VistoriaService, 
        private prestadoraVisService: PrestadoraVistoriaService) 
    {
        
        this.loadedParams = this.activatedRoute.snapshot.queryParams;
        this.idRecepcaoLaudo = this.activatedRoute.snapshot.paramMap.get('idRecepcaoLaudo');
        
        this.filtro = {
            totalRegistros: 0,
            itensPorPagina: 10,
            pagina: 0
        };
    }

    ngOnInit(): void {
        this.pesquisarLaudoInconsistencias(this.idRecepcaoLaudo);
        this.pesquisarNomePrestadora(this.loadedParams.idPrestadora);
    }

    pesquisarLaudoInconsistencias(idRecepcaoLaudo: string) {
        this.vistoriaService.getLaudoTransmitidoInconsistencias(idRecepcaoLaudo).subscribe(response => {
            this.inconsistenciaList = response;
            this.loading = false;
        },
        error => {
            this.messageService.error('Servidor não encontrado!');
            console.log("Error: ", error);
            this.loading = false;
        });
    }

    pesquisarNomePrestadora(idPrestadora: number) {
        this.prestadoraVisService.getPrestadoraVistoria(idPrestadora)
            .subscribe(
                response => {
                    this.nmPrestadora = `${idPrestadora} - ${response.razaoSocial}`;
                    this.loading = false;
                },
                error => {
                    this.messageService.error('Servidor não encontrado!');
                    console.log("Error: ", error);
                    this.loading = false;
                });
    }

    voltarPagina() {
        this.router.navigate(['/vistoria/laudos-transmitidos'], {
            queryParams: {
                idPrestadora: this.loadedParams.idPrestadoraPesquisaInicial,
                month: this.loadedParams.month,
                year: this.loadedParams.year
            }
        });
    }

}




