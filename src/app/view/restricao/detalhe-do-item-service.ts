import { RestricaoFiltro } from './restricao-filtro';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Response } from './response';
import { environment } from '../../../environments/environment';
import { DetalheDoItem } from './detalhe-do-item';

@Injectable()
export class DetalheDoItemService {

    baseUrl = `${environment.baseUrl}/v1/negocio-componentes`;

    constructor(private http: HttpClient) {
    }

    getRestricoes(restricaoFiltro: RestricaoFiltro): Observable<any> {
        return this.http.post<any>(this.baseUrl, restricaoFiltro).pipe(take(1));
    }
}
