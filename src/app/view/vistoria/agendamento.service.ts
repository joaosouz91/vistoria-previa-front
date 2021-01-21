import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import { Prestadora } from '../prestadora/prestadora';
import { DatePipe } from '@angular/common';
import { MessageUtil } from '../../service/message-util.service';
import { Agendamento } from './model/agendamento';
import { ResponseAgendamento } from './model/response-agendamento';
import { environment } from '../../../environments/environment';
import { Vistoria } from './model/vistoria';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  baseUrl = `${environment.baseUrl}/api/agendamentos`;

  constructor(private http: HttpClient, private message: MessageUtil, private datepipe: DatePipe) { }

  getSituacoesAgendamento(): Observable<any> {
    return of([
      { value: null, descricao: 'Todas' },
      { value: 'A_AGENDAR', descricao: 'Agendar' },
      { value: 'PEN', descricao: 'Aguardando Confirmação' },
      { value: 'AGD', descricao: 'Agendada' },
      { value: 'RGD', descricao: 'Reagendada' },
      { value: 'A_REAGENDAR', descricao: 'Reagendar' },
      { value: 'CAN', descricao: 'Cancelada' },
      { value: 'VFR', descricao: 'Frustrada' },
      { value: 'FTR', descricao: 'Fotos Recepcionadas' },
      { value: 'LKX', descricao: 'Link Expirado' },
      { value: 'PEF', descricao: 'Pendente de Novas Fotos' },
      { value: 'RLZ', descricao: 'Realizada' }
    ]);
  }

  obterVistoriaPorVoucher(voucher, id): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.baseUrl}/${voucher}/vistoria/${id}`).pipe(
      catchError(this.message.handleError<Agendamento>('obterVistoriaPorVoucher')),
      take(1)
    );
  }

  isPermiteVistoria(idVistoria: number): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.baseUrl}/vistoria/${idVistoria}`).pipe(
      catchError(error => {
        this.message.warnInline(error.error.message);
        return throwError(error);
      }),
      take(1)
    );
  }

  agendar(request: Agendamento): Observable<ResponseAgendamento[]> {
    return this.http.post<ResponseAgendamento[]>(`${this.baseUrl}`, request).pipe(
      catchError(this.message.handleError<ResponseAgendamento[]>('agendar')),
      take(1)
    );
  }


  cancelar(voucher: string, request: any) {
    return this.http.put(`${this.baseUrl}/${voucher}/cancelamento`, request).pipe(
      catchError(this.message.handleError('cancelar')),
      take(1)
    );
  }

  consultarDistribuicao(idVistoria: number, dataVistoria: Date, idRegiao: string): Observable<Prestadora[]> {
    let data = this.datepipe.transform(dataVistoria, 'ddMMyyyy')

    return this.http.get<Prestadora[]>(`${this.baseUrl}/distribuicao/${idVistoria}/${idRegiao}/${data}`).pipe(
      catchError(this.message.handleError<Prestadora[]>('consultarDistribuicao')),
      take(1)
    );
  }

  obterVistoriaPorCotacao(cotacao: number): Observable<Vistoria> {
    return this.http.get<Vistoria>(`${this.baseUrl}/santander/${cotacao}`).pipe(
      catchError(this.message.handleError<Vistoria>('obterVistoriaPorCotacao')),
      take(1)
    );
  }

  gravarPreAgendamento(cotacao: number, vistoria: Vistoria): Observable<Vistoria> {
    return this.http.put<Vistoria>(`${this.baseUrl}/santander/${cotacao}`, vistoria).pipe(
      catchError(this.message.handleError<Vistoria>('gravarPreAgendamento')),
      take(1)
    );
  }

  obterLocais(idVistoria: number, idRegiao: String): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vistoria/${idVistoria}/regiao/${idRegiao}/tipos`).pipe(
      catchError(this.message.handleError<any[]>('obterLocais')),
      take(1)
    );
  }

  obterDatasAgendamento(cidade): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/datas/${cidade}`).pipe(
      catchError(this.message.handleError<any[]>('obterDatasAgendamento')),
      take(1)
    );
  }
}
