import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posto } from '../model/posto';
import { map, catchError, take } from 'rxjs/operators';
import { Pagination } from '../model/pagination';
import { MessageUtil } from '../../../service/message-util.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostoService {

  baseUrl = `${environment.baseUrl}/api`;

  constructor(private http: HttpClient, private message: MessageUtil) { }

  pesquisar(filtro: any, pagination: Pagination = { page: 0, size: 10 }): Observable<any> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('size', pagination.size.toString());

    let options = {
      params: params
    }

    return this.http.post(`${this.baseUrl}/postos/pesquisa`, filtro, options).pipe(
      map((result: any) => {
        return {
          postos: result.content,
          total: result.totalElements
        };
      }),
      take(1)
    );
  }

  getPrestadoraVistoria(codigoPosto: number, codigoPrestadora: number): Observable<Posto> {
    return this.http.get<Posto>(`${this.baseUrl}/prestadora/${codigoPrestadora}/postos/${codigoPosto}`).pipe(take(1));
  }

  getCidadesPorPrestadoraEstado(codigoPrestadora: string, uf: string): Observable<HttpResponse<string[]>> {
    return this.http.get<string[]>(`${this.baseUrl}/prestadora/${codigoPrestadora}/postos/${uf}/cidades`, { observe: 'response' }).pipe(take(1));
  }

  getCidadesPorEstado(uf: string, isCaminhao?: boolean): Observable<HttpResponse<string[]>> {
    let params = new HttpParams()

    if (isCaminhao) {
      params = params.set('isCaminhao', 'true');
    }

    return this.http.get<string[]>(`${this.baseUrl}/postos/${uf}/cidades`, { params, observe: 'response' }).pipe(
      take(1)
    );

  }

  getBairrosPorRegiao(idRegiao: string, isCaminhao?: boolean): Observable<string[]> {
    let params = new HttpParams()

    if (isCaminhao) {
      params = params.set('isCaminhao', 'true');
    }

    return this.http.get<string[]>(`${this.baseUrl}/postos/${idRegiao}/bairros`, { params }).pipe(
      catchError(this.message.handleError<string[]>('getBairrosPorRegiao')),
      take(1)
    );

  }

  getBairrosPorUfCidade(uf: string, cidade: string, isCaminhao?: boolean): Observable<string[]> {
    let params = new HttpParams()

    if (isCaminhao) {
      params = params.set('isCaminhao', 'true');
    }

    return this.http.get<string[]>(`${this.baseUrl}/postos/${uf}/${cidade}/bairros`, { params }).pipe(
      catchError(this.message.handleError<string[]>('getBairrosPorUfCidade')),
      take(1)
    );

  }

  getPostosPorLocal(idVistoria: number, idRegiao: string, bairro?: string, isCaminhao?: boolean): Observable<Posto[]> {
    let params = new HttpParams()

    if (bairro) {
      params = params.set('bairro', bairro);
    }

    if (isCaminhao) {
      params = params.set('isCaminhao', 'true');
    }

    return this.http.get<Posto[]>(`${this.baseUrl}/vistoria/${idVistoria}/postos/${idRegiao}`, { params }).pipe(
      catchError(this.message.handleError<Posto[]>('getPostosPorLocal')),
      take(1)
    );

  }

  atualizar(posto: Posto): Observable<any> {
    return this.http.put(`${this.baseUrl}/prestadora/${posto.codigoPrestadora}/postos/${posto.codigoPosto}`, posto).pipe(take(1));
  }
}