import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take} from 'rxjs/operators';
import { Dispensa } from '../dispensa/dispensa';
import { environment } from '../../../environments/environment';

@Injectable()
export class DivergenciaService {

    baseUrl = `${environment.baseUrl}/v1/motivo-divergencias`;
                
    constructor(private http: HttpClient) {        
    }

    getMotivoDivergencias(): Observable<any> {
        return this.http.get<any>(this.baseUrl).pipe(take(1));        
    }

    postSalvar(dispensa: Dispensa): Observable<any> {
        return this.http.post<any>(this.baseUrl, dispensa).pipe(take(1));
    }
}