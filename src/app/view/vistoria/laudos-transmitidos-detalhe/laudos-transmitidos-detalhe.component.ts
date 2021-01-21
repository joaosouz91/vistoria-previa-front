import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageUtil } from '../../../service/message-util.service';
import { VistoriaService } from '../vistoria.service';
import { PrestadoraVistoriaService } from '../../prestadora/prestadora-module/prestadora-vistoria-service';
import * as _ from 'lodash';


@Component({
    selector: 'app-laudos-transmitidos-detalhe',
    templateUrl: './laudos-transmitidos-detalhe.component.html',
    styleUrls: ['./laudos-transmitidos-detalhe.component.css']
})
export class LaudosTransmitidosDetalheComponent implements OnInit {

    laudoDetalhe: any;
    nmPrestadora: string;
    loadedParams: any;
    loading: boolean;
    idRecepcaoLaudo: string;

    constructor(
        private activatedRoute: ActivatedRoute, 
        private messageService: MessageUtil, 
        private vistoriaService: VistoriaService, 
        private prestadoraVisService: PrestadoraVistoriaService, 
        private datepipe: DatePipe) 
    {
        this.loadedParams = this.activatedRoute.snapshot.queryParams;
        this.idRecepcaoLaudo = this.activatedRoute.snapshot.paramMap.get('idRecepcaoLaudo');
    }

    ngOnInit() {
        this.pesquisarLaudoDetalhe();
        this.pesquisarNomePrestadora(this.loadedParams.idPrestadora)
    }

    pesquisarLaudoDetalhe() {
        this.vistoriaService.getLaudoTransmitidoDetalhe(this.idRecepcaoLaudo).subscribe(response => {
            this.laudoDetalhe = response;
            console.log('this.laudoDetalhe', this.laudoDetalhe)
            this.loading = false;
        },
        error => {
            this.messageService.error('Servidor não encontrado!');
            console.log("Error: ", error);
        });
    }

    pesquisarNomePrestadora(idPrestadora: number) {
        this.prestadoraVisService.getPrestadoraVistoria(idPrestadora)
            .subscribe(
                response => {
                    this.nmPrestadora = `${idPrestadora} - ${response.razaoSocial}`;
                },
                error => {
                    this.messageService.error('Servidor não encontrado!');
                    console.log("Error: ", error);
                    this.loading = false;
                });
    }

    formatKey(item: any) {
        return  item.replace(/([A-Z])/g, ' $1')
                    .replace(/^./, function(str){ return str.toUpperCase(); })
                    .replaceAll("cao", "ção")
                    .replaceAll("Codigo", "Código")
                    .replaceAll("Acessorio", "Acessório")
                    .replaceAll("Cambio", "Câmbio")
                    .replaceAll("Veiculo", "Veículo")
                    .replaceAll("Numero", "Número")
                    .replaceAll("Proprietario", "Proprietário")
                    .replaceAll("Peca", "Peça")
                    .replaceAll("ivel", "ível")
                    .replaceAll("Uf", "UF")
                    .replaceAll("ssao", "ssão")
                    .replaceAll("C R L V", "CRLV")
                    .replaceAll("Cpf", "CPF")
                    .replaceAll("Cnpj", "CNPJ")
                    .replaceAll("Uf", "UF")
                    .replaceAll("Cnh", "CNH")
                    .replaceAll("Cep", "CEP")
                    .replaceAll("Km", "KM");
    }

    formatValue(item: any) {
        if(item instanceof Date) {
            return this.transformDate(item);
        } 
        return item;
    }

    transformDate(date: Date) {
        return this.datepipe.transform(date, 'dd/MM/yyyy');
    }

}

