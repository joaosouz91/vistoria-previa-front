import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AvariasService {
    baseUrl = `${environment.baseUrl}/api/avarias`;

    constructor(private http: HttpClient) {}

    findAll(descricao?: string, situacao?: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}?descricao=${descricao}&situacao=${situacao}`).pipe(
            take(1)
        );
    }

    create(avaria: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}`, avaria).pipe(
            take(1)
        );
    }

    update(tipo: string, avaria: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/${tipo}`, avaria).pipe(
            take(1)
        );
    }
}
