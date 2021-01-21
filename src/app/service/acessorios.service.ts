import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AcessorioVistoriaPrevia } from '../model/parametro/acessorio-vistoria-previa';

@Injectable({
    providedIn: 'root'
})
export class AcessoriosService {
    baseUrl = `${environment.baseUrl}/api/acessorios`;

    constructor(private http: HttpClient) {}

    findAll(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}`).pipe(
            take(1)
        );
    }

    create(acessorio: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}`, acessorio).pipe(
            take(1)
        );
    }

    update(id: number, acessorio: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/${id}`, acessorio).pipe(
            take(1)
        );
    }
}
