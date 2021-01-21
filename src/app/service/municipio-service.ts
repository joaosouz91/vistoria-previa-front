import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageUtil } from './message-util.service';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class MunicipioService {

    baseUrl = `${environment.baseUrl}/api/municipio`;

    constructor(private http: HttpClient, private message: MessageUtil) {
    }

    findMunicipiosByUf(uf: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/uf/${uf}`).pipe(
            catchError(this.message.handleError<any>('findMunicipiosByUf')),
            take(1)
        );
    }

    findMunicipioByCodigo(codigo: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/codigo/${codigo}`).pipe(
            catchError(this.message.handleError<any>('findMunicipioByCodigo')),
            take(1)
        );
    }
}