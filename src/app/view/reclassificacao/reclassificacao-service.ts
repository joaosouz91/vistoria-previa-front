import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ResponseReclasificacao } from './response-reclasificacao';
import { RestricaoFiltro } from '../restricao/restricao-filtro';
import { ReclassificacaoAlterarStatus } from './reclassificacao-alterar-status';
import { ResponseDispensa } from '../dispensa/response-dispensa';
import { environment } from '../../../environments/environment';

@Injectable()
export class ReclassificacaoService {

    baseUrl = `${environment.baseUrl}/v1/negocio-reclassificacoes`;
    baseUrlSalvar = `${environment.baseUrl}/v1/negocio-reclassificacoes/salvar`;

    constructor(private http: HttpClient) {
    }

    getReclassificacao(restricaoFiltro: RestricaoFiltro): Observable<any> {
        return this.http.post<any>(this.baseUrl, restricaoFiltro).pipe(take(1));
    }

    postSalvarReclassificacao(reclassificacaoAlterarStatus: ReclassificacaoAlterarStatus): Observable<any> {
        return this.http.post<any>(this.baseUrlSalvar, reclassificacaoAlterarStatus).pipe(take(1));
    }
}