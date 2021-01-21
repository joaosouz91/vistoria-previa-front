import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FiltroLaudo } from '../filtro-response/filtro-laudo';
import { ResponseLaudo } from '../filtro-response/response-laudo';
import { LaudoFull } from '../model/laudo-full';
import { environment } from '../../../../environments/environment';
import { AvariaLaudoVistoriaPrevia } from '../model/AvariaLaudoVistoriaPrevia';

@Injectable()
export class LaudoVistoriaService {

    baseUrl = `${environment.baseUrl}/v1/laudo-vistoria`;

    constructor(private http: HttpClient) {
    }

    consultarLaudo(filtro: FiltroLaudo): Observable<Array<ResponseLaudo>> {

        return this.http.post<Array<ResponseLaudo>>(this.baseUrl, filtro).pipe(take(1));
    }

    atualizar(laudo: LaudoFull): Observable<any> {

        return this.http.put(this.baseUrl + '/laudo/save', laudo).pipe(take(1));
    }

    obterLaudo(codigo: string): Observable<LaudoFull> {
        return this.http.get<LaudoFull>(this.baseUrl + '/laudo/' + codigo).pipe(take(1));
    };

    desvincularLaudo(codigoLaudo: String): Observable<LaudoFull> {
        return this.http.get<LaudoFull>(`${this.baseUrl}/laudo/desvincular-laudo/` + codigoLaudo).pipe(take(1));
    };

    bloquearPorSupervisao(codigoLaudo: String): Observable<LaudoFull> {
        return this.http.get<LaudoFull>(`${this.baseUrl}/laudo/bloquear-por-supervisao/` + codigoLaudo).pipe(take(1));
    };

    desbloquerLaudo(laudo: LaudoFull): Observable<any> {

        return this.http.put(this.baseUrl + "/laudo/bloqueio", laudo).pipe(take(1));
    }

    obterLogVinculoLaudo(codigoLaudo: String): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/laudo/${codigoLaudo}/log-detalhe`).pipe(take(1));

    }

    listaFinalidades(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/finalidade-vistorias-all`).pipe(take(1));
    }

    obterFinalidade(cod: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/finalidade-vistorias/${cod}`).pipe(take(1));
    }

    getListaTipoLocalVistoria(): Observable<any> {

        return this.http.get<any>(`${this.baseUrl}/tipo-local-vistoria`).pipe(take(1));
    }
    getListaPecas(): Observable<any> {

        return this.http.get<any>(`${this.baseUrl}/arquivopecas`).pipe(take(1));
    }
    getListaAvarias(): Observable<any> {

        return this.http.get<any>(`${this.baseUrl}/arquivoavarias`).pipe(take(1));
    }

    getAvarias(cdLvpre: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/avarias/` + cdLvpre).pipe(take(1));
    }

    getAvaria(cdLvpre: string, codPeca: number, tpAvaria: string): Observable<AvariaLaudoVistoriaPrevia> {
        return this.http.get<AvariaLaudoVistoriaPrevia>(`${this.baseUrl}/avaria/` + cdLvpre + '/' + codPeca + '/' + tpAvaria).pipe(take(1));
    }
    saveAvariaLaudoVistoriaPrevia(avariaLaudoVistoriaPrevia: AvariaLaudoVistoriaPrevia): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/avarias`,avariaLaudoVistoriaPrevia).pipe(take(1));
    }

    deleteAvaria(cdLvpre: string, codPeca: number, tpAvaria: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/avaria/` + cdLvpre + '/' + codPeca + '/' + tpAvaria).pipe(take(1));
    }
}