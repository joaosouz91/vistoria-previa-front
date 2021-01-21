import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FiltroAgendamento } from './model/filtro-agendamento';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import { Vistoria } from './model/vistoria';
import { MessageUtil } from '../../service/message-util.service';
import { VistoriaFiltroSession } from './component/vistoria.filtro.session';
import { environment } from '../../../environments/environment';
import { PrestadoraVistoria } from '../prestadora/prestadora-vistoria';
import { LaudoTransmitido } from '../../model/vistoria/laudo-transmitido';

@Injectable()
export class VistoriaService {

    baseUrl = `${environment.baseUrl}/api/vistoria-previa-obrigatoria`;

    constructor(private http: HttpClient, private message: MessageUtil, private filtroSession: VistoriaFiltroSession) { }

    getUltimoFiltro(): FiltroAgendamento {
        return this.filtroSession.filtro;
    }

    getPrestadoras(ativo: boolean): Observable<PrestadoraVistoria[]> {
        return this.http.get<PrestadoraVistoria[]>(`${environment.baseUrl}/v1/prestadora-vistorias/todos?ativo=${ativo}`).pipe(take(1));
    }

    pesquisarVistorias(filtro: FiltroAgendamento): Observable<Vistoria[]> {
        this.filtroSession.filtro = filtro;
        return this.http.post<Vistoria[]>(`${this.baseUrl}/pesquisa`, filtro)
            .pipe(
                catchError(this.message.handleError<Vistoria[]>('pesquisarVistorias')),
                take(1)
            );
    }

    pesquisarFrota(filtro: FiltroAgendamento): Observable<Vistoria[]> {
        return this.http.post<Vistoria[]>(`${this.baseUrl}/frota/pesquisa`, filtro).pipe(
            catchError(this.message.handleError<Vistoria[]>('pesquisarFrota')),
            take(1)
        );
    }

    obterVistoria(idVistoria: number): Observable<Vistoria> {
        return this.http.get<Vistoria>(`${this.baseUrl}/${idVistoria}`).pipe(
            // catchError(this.message.handleError<Vistoria>('obterVistoria')),
            take(1)
        );
    }

    save(request: Vistoria): Observable<Vistoria> {
        return this.http.post<Vistoria>(`${this.baseUrl}/salvar`, request).pipe(
            catchError(this.message.handleError<Vistoria>('salvar'))
        );
    }

    getLaudosTransmitidos(idPrestadora?: number, codLaudo?: string, chassi?: string, numPlaca?: string,
        laudoAceito?: string, dataPesquisaDe?: string, dataPesquisaAte?: string): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}/api/vistoria/laudos-transmitidos?idPrestadora=${idPrestadora}&codLaudo=${codLaudo}&chassi=${chassi}&numPlaca=${numPlaca}&laudoAceito=${laudoAceito}&dataPesquisaDe=${dataPesquisaDe}&dataPesquisaAte=${dataPesquisaAte}`)
            .pipe(take(1));
    }

    getLaudoTransmitidoDetalhe(idRecepcaoLaudo?: string): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}/api/vistoria/laudos-transmitidos/${idRecepcaoLaudo}`).pipe(take(1));
    }

    getLaudoTransmitidoInconsistencias(idRecepcaoLaudo?: string): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}/api/vistoria/laudos-transmitidos/${idRecepcaoLaudo}/inconsistencias`).pipe(take(1));
    }
}
