import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { environment } from '../../environments/environment';
import { Paged } from '../model/paged';
import { DistribuicaoMunicipio } from '../model/distribuicao-municipio';

@Injectable({
    providedIn: 'root'
})
export class RegiaoTarifariaService {
    baseUrl = `${environment.baseUrl}/api/distribuicao`;

    constructor(private http: HttpClient) {
    }

    findAllPrestadoraVistoriaPrevia(event: LazyLoadEvent): Observable<Paged<any>> {
        let params = new HttpParams()
            .append('page', (event.first / event.rows).toString())
            .append('size', event.rows.toString());

        if (event.filters.cdMunic) {
            params = params.append('cdMunic', event.filters.cdMunic.value);
        }

        if (event.filters.nmMunic) {
            params = params.append('nmMunic', event.filters.nmMunic.value);
        }

        if (event.filters.prestadora) {
            params = params.append('prestadora', event.filters.prestadora.value);
        }

        return this.http.get<Paged<any>>(`${this.baseUrl}`, { params })
            .pipe(
                take(1)
            );
    }

    findAllPrestadoraVistoriaPreviaByIdRegiao(idRegiao: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${idRegiao}`).pipe(
            take(1)
        );
    }

    save(idRegiao: number, distribuicao: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${idRegiao}`, distribuicao).pipe(
            //catchError(this.message.handleError<any>()),
            take(1)
        );
    }

    findDistribuicaoMunicipio(): Observable<DistribuicaoMunicipio[]> {
        return this.http.get<DistribuicaoMunicipio[]>(`${this.baseUrl}/uf`).pipe(
            take(1)
        );
    }

    redistribuirPorUF(distribuicaoUF: DistribuicaoMunicipio): Observable<any> {
        return this.http.post<DistribuicaoMunicipio[]>(`${this.baseUrl}/uf`, distribuicaoUF).pipe(
            take(1)
        );
    }
}
