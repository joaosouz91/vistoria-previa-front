import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LaudoTransmitidoFilter } from '../../../model/vistoria/filter/laudo-transmitido-filter';
import { MessageUtil } from '../../../service/message-util.service';
import { SelectItem } from 'primeng/api';
import { VistoriaService } from '../vistoria.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-laudos-transmitidos-consulta',
    templateUrl: './laudos-transmitidos-consulta.component.html',
    styleUrls: ['./laudos-transmitidos-consulta.component.css']
})
export class LaudosTransmitidosConsultaComponent implements OnInit {

    prestadorasCombo: SelectItem[];
    filter: LaudoTransmitidoFilter;
    laudoAceitoCombo: SelectItem[];
    laudosTransmitidos : any[];
    loading: boolean;
    loadedParams: any;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageUtil, private vistoriaService: VistoriaService, private datepipe: DatePipe) {
        
        this.prestadorasCombo = [];
        this.filter = new LaudoTransmitidoFilter();
        this.laudosTransmitidos = [];

        this.loadedParams = this.activatedRoute.snapshot.queryParams;

        this.laudoAceitoCombo = [
            { label : 'Todos', value : '' },
            { label : 'Sim', value : 'S' }, 
            { label : 'Não', value : 'N' }
        ];
    }

    ngOnInit() {

        this.vistoriaService.getPrestadoras(true).subscribe(
            response => {
                response.sort((a, b) => a.cdAgrmtVspre - b.cdAgrmtVspre);
                this.prestadorasCombo.push({ label: `[TODAS]`, value: 0 })
                response.forEach(
                    prestadoraVistoria => {
                        this.prestadorasCombo.push({
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

        if(this.loadedParams.isFromDetalhe){
            this.filter.chassi = this.loadedParams.chassi;
            this.filter.idPrestadora = this.loadedParams.chassi;
            this.filter.codLaudo = this.loadedParams.chassi;
            this.filter.numPlaca = this.loadedParams.chassi;
            this.filter.laudoAceito = this.loadedParams.chassi;
            this.filter.periodo[0] = new Date(this.loadedParams.diaInicio);
            this.filter.periodo[1] = new Date(this.loadedParams.diaFim);
            this.onPesquisar();
        }

    }

    onPesquisar() {
        if(!this.validatePeriod()) return false;
        this.laudosTransmitidos = null;
        this.vistoriaService.getLaudosTransmitidos(
            this.filter.idPrestadora != null ? this.filter.idPrestadora : 0,
            this.filter.codLaudo != null ? this.filter.codLaudo : '',
            this.filter.chassi != null ? this.filter.chassi : '',
            this.filter.numPlaca != null ? this.filter.numPlaca : '',
            this.filter.laudoAceito != null ? this.filter.laudoAceito : '',
            this.transformDate(this.filter.periodo[0]),
            this.transformDate(this.filter.periodo[1]),
        ).subscribe(
            response => {
                console.log('response', response);
                this.laudosTransmitidos = response.content;
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

    forwardDetalhe(idRecepcaoLaudo: string, idPrestadora: number) {
        this.router.navigate([`/vistoria/laudos-transmitidos/${idRecepcaoLaudo}`], {
            queryParams: {
                idPrestadora: idPrestadora
            }
        });
    }

    forwardInconsistencias(idRecepcaoLaudo: string, idLaudo: string, idPrestadora: number) {
        this.router.navigate([`/vistoria/laudos-transmitidos/${idRecepcaoLaudo}/inconsistencias`], {
            queryParams: {
                idPrestadora: idPrestadora,
                idLaudo: idLaudo
            }
        });
    }

}
