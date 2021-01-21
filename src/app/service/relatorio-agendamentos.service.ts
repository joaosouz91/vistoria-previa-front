import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PrestadoraVistoria } from '../../app/view/prestadora/prestadora-vistoria';

@Injectable()
export class RelatorioAgendamentoService {

    baseUrl = `${environment.baseUrl}/api/relatorios`;
                
    constructor(private http: HttpClient) {        
    }

    getPrestadoras(ativo: boolean): Observable<PrestadoraVistoria[]> {
        return this.http.get<PrestadoraVistoria[]>(`${environment.baseUrl}/v1/prestadora-vistorias/todos?ativo=${ativo}`).pipe(take(1));
    }

    getSituacoesVistoria(tela?: string) : Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}/v1/combos/situacoes-vistoria?tela=${tela}`).pipe(take(1));
    }

    getRelatorioRejeitadosFrustradosEager(
        numVoucher?: string, codCorretor?: number, prestadora?: number, codSitVistoria?: string, dataPesquisaDe?: string, dataPesquisaAte?: string): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/agendamentos/rejeitados-frustrados?numVoucher=${numVoucher}&codCorretor=${codCorretor}&idPrestadora=${prestadora}&codSitVistoria=${codSitVistoria}&dataPesquisaDe=${dataPesquisaDe}&dataPesquisaAte=${dataPesquisaAte}`).pipe(take(1));
    }

    getRelatorioHistoricoAgendamentosEager(
        numVoucher?: string, codCorretor?: number, numPlaca?: string, codSitVistoria?: string, dataPesquisaDe?: string, dataPesquisaAte?: string): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/agendamentos/historico-agendamentos?numVoucher=${numVoucher}&codCorretor=${codCorretor}&numPlaca=${numPlaca}&codSitVistoria=${codSitVistoria}&dataPesquisaDe=${dataPesquisaDe}&dataPesquisaAte=${dataPesquisaAte}`).pipe(take(1));
    }

    getRelatorioSituacaoAgendamentosEager(
        numVoucher?: string, codCorretor?: number, prestadora?: number, codSitVistoria?: string, formaAgrupamento?: string, dataPesquisaDe?: string, dataPesquisaAte?: string): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/agendamentos/situacao-agendamentos?numVoucher=${numVoucher}&codCorretor=${codCorretor}&idPrestadora=${prestadora}&codSitVistoria=${codSitVistoria}&formaAgrupamento=${formaAgrupamento}&dataPesquisaDe=${dataPesquisaDe}&dataPesquisaAte=${dataPesquisaAte}`).pipe(take(1));
    }

    getRelatorioStatusPrestadora(
        numVoucher?: string, codCorretor?: number, prestadora?: number, codSitVistoria?: string, formaAgrupamento?: string, dataPesquisaDe?: string, dataPesquisaAte?: string): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/agendamentos/status-prestadora?numVoucher=${numVoucher}&codCorretor=${codCorretor}&idPrestadora=${prestadora}&codSitVistoria=${codSitVistoria}&formaAgrupamento=${formaAgrupamento}&dataPesquisaDe=${dataPesquisaDe}&dataPesquisaAte=${dataPesquisaAte}`).pipe(take(1));
    }

    getAgendamentosStatusLocal(
        codCorretor: number, periodo: string): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/agendamentos/agendamentos-status-local?codCorretor=${codCorretor}&periodo=${periodo}`).pipe(take(1));
    }

}