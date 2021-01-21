import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MotivoDispensaService {
    baseUrl = `${environment.baseUrl}/api/motivos-dispensa`;

    constructor(private http: HttpClient) {}

    findAll(descricao?: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}?descricao=${descricao}`).pipe(
            take(1)
        );
    }

    findById(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
            take(1)
        );
    }

    create(motivoDispensa: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}`, motivoDispensa).pipe(
            take(1)
        );
    }

    update(id: string, motivoDispensa: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/${id}`, motivoDispensa).pipe(
            take(1)
        );
    }
}
