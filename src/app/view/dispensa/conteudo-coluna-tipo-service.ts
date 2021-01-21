import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take} from 'rxjs/operators';
import { Dispensa } from './dispensa';
import { ResponseDispensa } from './response-dispensa';
import { environment } from '../../../environments/environment';
import { ConteudoColunaTipo } from './conteudo-coluna-tipo';

@Injectable()
export class ConteudoColunaTipoService {

    baseUrl = `${environment.baseUrl}/v1/motivo-dispensas`;
    
    constructor(private http: HttpClient) {        
    }

    getMotivoDispensas(): Observable<ConteudoColunaTipo[]> {
        return this.http.get<ConteudoColunaTipo[]>(this.baseUrl).pipe(take(1));        
    }

    postSalvar(dispensa: Dispensa): Observable<ResponseDispensa> {
        return this.http.post<ResponseDispensa>(this.baseUrl, dispensa).pipe(take(1));
    }
}