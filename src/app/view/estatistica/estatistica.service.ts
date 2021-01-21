import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PrestadoraVistoria } from '../prestadora/prestadora-vistoria';
import { EstatisticaVistoriasRealizadas } from '../../model/estatistica/EstatisticaVistoriasRealizadas';

@Injectable()
export class EstatisticaService {

    baseUrl = `${environment.baseUrl}/api/estatistica`;
                
    constructor(private http: HttpClient) {        
    }

    getPrestadoras(ativo: boolean): Observable<PrestadoraVistoria[]> {
        return this.http.get<PrestadoraVistoria[]>(`${environment.baseUrl}/v1/prestadora-vistorias/todos?ativo=${ativo}`).pipe(take(1));
    }

    getVistoriasRealizadasEager(
        prestadora: number, periodo: string): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/vistorias-realizadas?idPrestadora=${prestadora}&periodo=${periodo}`).pipe(take(1));
    }

    getVistoriasRealizadasLazy(
        prestadora: number, periodo: string, page: string, size: string): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/vistorias-realizadas?idPrestadora=${prestadora}&periodo=${periodo}&page=${page}&size=${size}`).pipe(take(1));
    }

    getVistoriasRealizadasDetalheEager(
        prestadora: number, periodo: string, situacao: string): Observable<any> {
            console.log(`${this.baseUrl}/vistorias-realizadas/detalhe?idPrestadora=${prestadora}&periodo=${periodo}&situacao=${situacao}`);
            return this.http.get<any>(
                `${this.baseUrl}/vistorias-realizadas/detalhe?idPrestadora=${prestadora}&periodo=${periodo}&situacao=${situacao}`).pipe(take(1));
    }

    getVistoriasRealizadasDetalheLazy(
        prestadora: number, periodo: string, situacao: string, page: string, size: string): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/vistorias-realizadas/detalhe?idPrestadora=${prestadora}&periodo=${periodo}&situacao=${situacao}&page=${page}&size=${size}`).pipe(take(1));
    }

    getAtrasosTransmissaoAgrupamentoEager(
        prestadora: number, periodo: string): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/atrasos-transmissao?idPrestadora=${prestadora}&periodo=${periodo}`).pipe(take(1));
    }

    getAtrasosTransmissaoAgrupamentoLazy(
        prestadora: number, periodo: string, page: number, size: number): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/atrasos-transmissao?idPrestadora=${prestadora}&periodo=${periodo}&page=${page}&size=${size}`).pipe(take(1));
    }

    getAtrasosTransmissaoDetalheLaudoEager(
        prestadora: number, periodo: string, diaInicio: number, diaFim: number): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/atrasos-transmissao/detalhe-laudo?idPrestadora=${prestadora}&periodo=${periodo}&diaInicio=${diaInicio}&diaFim=${diaFim}`).pipe(take(1));
    }

    getAtrasosTransmissaoDetalheLaudoLazy(
        prestadora: number, periodo: string, diaInicio: number, diaFim: number, page: number, size: number): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/atrasos-transmissao/detalhe-laudo?idPrestadora=${prestadora}&periodo=${periodo}&diaInicio=${diaInicio}&diaFim=${diaFim}&page=${page}&size=${size}`).pipe(take(1));
    }

    getAtrasosTransmissaoDetalheTotal(
        prestadora: number, periodo: string): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/atrasos-transmissao/detalhe-total?idPrestadora=${prestadora}&periodo=${periodo}`).pipe(take(1));
    }

    getParamVistoriaPrevia(): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/atrasos-transmissao/param-vp`).pipe(take(1));
    }

    getEstatisticaFaturamentoEager(
        prestadora: number, periodo: string): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/relatorio-faturamento?idPrestadora=${prestadora}&periodo=${periodo}`).pipe(take(1));
    }

    getDetalheEstatisticaFaturamentoEager(
        prestadora: number, periodo: string, tipoLocalVistoria: string, distanciaKilometragem: number): Observable<any> {
            return this.http.get<any>(
                `${this.baseUrl}/relatorio-faturamento/detalhe?idPrestadora=${prestadora}&periodo=${periodo}&tipoLocalVistoria=${tipoLocalVistoria}&distanciaKilometragem=${distanciaKilometragem}`).pipe(take(1));
    }

    
}