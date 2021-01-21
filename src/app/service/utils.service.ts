import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageUtil } from './message-util.service';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  baseUrl = `${environment.baseUrl}/v1/utils`;

  constructor(private http: HttpClient, private message: MessageUtil) {
  }

  obterMotivosCancelamento(tipoVistoria: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/motivos/cancelamento/${tipoVistoria}`).pipe(
      catchError(this.message.handleError<any[]>('obterMotivosCancelamento')),
      take(1)
    );
  }
}