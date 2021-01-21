import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Prestadora } from '../prestadora';
import { ResponsePrestadoraVistoria } from '../response-prestadora-vistoria';
import { FiltroPrestadora } from '../filtro-prestadora';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PrestadoraVistoriaService {

    baseUrl = `${environment.baseUrl}/v1/prestadora-vistorias`;

    constructor(private http: HttpClient) {
    }

    getPrestadoraVistoria(codigo: number): Observable<Prestadora> {

        return this.http.get<Prestadora>(`${this.baseUrl}/${codigo}`).pipe(take(1));
    }

    getAllVistoriaPrevia(): Observable<any> {

        return this.http.get<any>(`${this.baseUrl}/todos`).pipe(take(1));

    }

    pesquisaPrestadora(filtroPrestadora: FiltroPrestadora): Observable<any> {
        let params = new HttpParams();

        params = params.set('page', filtroPrestadora.pagina.toString()).set('size', filtroPrestadora.itensPorPagina.toString());

        let options = {
            params: params
        };

        return this.http.post(`${this.baseUrl}/pesquisa`, filtroPrestadora, options).pipe(
            map((result: any) => {
                return {
                    prestadoras: result.content,
                    total: result.totalElements
                };
            }),
            take(1)
        );
    }

    salvar(prestadora: Prestadora): Observable<any> {
        return this.http.post(this.baseUrl, prestadora).pipe(take(1));
    }

    atualizar(codigoPrestadora: number, prestadora: Prestadora): Observable<any> {
        return this.http.put(`${this.baseUrl}/${codigoPrestadora}`, prestadora).pipe(take(1));
    }
}