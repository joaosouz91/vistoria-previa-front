import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PecasService {
    baseUrl = `${environment.baseUrl}/api/pecas`;

    constructor(private http: HttpClient) {}

    findAll(descricao?: string, situacao?: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}?descricao=${descricao}&situacao=${situacao}`).pipe(
            take(1)
        );
    }

    create(peca: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}`, peca).pipe(
            take(1)
        );
    }

    update(id: number, peca: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/${id}`, peca).pipe(
            take(1)
        );
    }
}
