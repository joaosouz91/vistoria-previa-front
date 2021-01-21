import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Corretor } from '../model/corretor';
import { environment } from '../../environments/environment';

@Injectable()
export class CorretorService {

    baseUrl = `${environment.baseUrl}/v1/corretores`;

    constructor(private http: HttpClient) {
    }

    postPesquisaCorretor(corretor: Corretor): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/pesquisa`, corretor).pipe(take(1));
    }

    pesquisarCorretor(tipo: string, valor:string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/pesquisa/${tipo}/${valor}`).pipe(take(1));
    }
}
