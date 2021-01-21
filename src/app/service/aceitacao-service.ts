import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageUtil } from './message-util.service';
import { Observable } from 'rxjs';
import { Logradouro } from '../model/logradouro';
import { catchError, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AceitacaoService {
   
    baseUrl = `${environment.baseUrl}/v1/api/servicos-aceitacao`;
   
    constructor(private http: HttpClient, private message: MessageUtil) {
    }
   
    obterLogradouro(cep: string): Observable<Logradouro> {
        return this.http.get<Logradouro>(`${this.baseUrl}/logradouro/${cep}`).pipe(
            catchError(this.message.handleError<Logradouro>('obterLogradouro')),
            take(1)
        );
    }
}