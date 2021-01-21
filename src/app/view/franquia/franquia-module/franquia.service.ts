import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FiltroFranquia } from '../franquia-response/filtro-franquia';
import { Franquia } from '../model/Franquia';
import { ResponseFranquia } from '../franquia-response/response-franquia';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FranquiaService{

    baseUrl = `${environment.baseUrl}/v1/franquia`;

    constructor(private http: HttpClient) {
    }
    
    getListaFranquia(): Observable<ResponseFranquia> {
        return this.http.get<ResponseFranquia>(this.baseUrl).pipe(take(1));
    }

    getFranquia(codigo: string): Observable<Franquia> {
        return this.http.get<Franquia>(`${this.baseUrl}/${codigo}`).pipe(take(1));
    }

    pesquisaFranquia(filtroFranquia: FiltroFranquia): Observable<any> {
        let params = new HttpParams();

        params = params.set('page', filtroFranquia.pagina.toString()).set('size', filtroFranquia.itensPorPagina.toString());

        let options = {
            params: params
        };

        return this.http.post(`${this.baseUrl}/pesquisa`, filtroFranquia, options).pipe(
            map((result: any) => {
                return {
                    franquia: result.content,
                    total: result.totalElements
                };
            }),
            take(1)
        );
    }

    salvar(franquia: Franquia): Observable<any> {
        return this.http.post(this.baseUrl, franquia).pipe(take(1));
    }
    
    atualizar(codigo: string, franquia: Franquia): Observable<any> {

        return this.http.put(`${this.baseUrl}/${codigo}`, franquia).pipe(take(1));
    }
}