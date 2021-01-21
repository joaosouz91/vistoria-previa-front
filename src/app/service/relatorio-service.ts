import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { catchError, take, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MessageUtil } from './message-util.service';
import { RelatorioImprodutividade } from '../model/relatorio/relatorio-improdutividade';
import { RelatorioImprodutividadeCorretor } from '../model/relatorio/relatorio-improdutividade-corretor';
import { LoteLaudoImprodutivoDetalheAux } from '../model/relatorio/lote-laudo-improdutivo-detalhe-aux';
import { LoteLaudoImprodutivoAux } from '../model/relatorio/lote-laudo-improdutivo-aux';

@Injectable({
    providedIn: 'root'
})
export class RelatorioService {
    baseUrl = `${environment.baseUrl}/api/relatorio`;

    constructor(
        private http: HttpClient,
        private message: MessageUtil
    ) { }

    getVisoesRelatorioImprodutivo(): Observable<SelectItem[]> {
        return this.http.get<SelectItem[]>(`${this.baseUrl}/vistoria/improdutiva/visoes`)
            .pipe(
                catchError(this.message.handleError<any>('getVisoesRelatorioImprodutivo')),
                take(1)
            );
    }

    getSuperintendenciasRelatorioImprodutivo(): Observable<SelectItem[]> {
        return this.http.get<any[]>(`${this.baseUrl}/vistoria/improdutiva/superintendencias`)
            .pipe(
                map(superintendencias =>
                    superintendencias.map(s => <SelectItem>{ value: s.codigo, label: `${s.codigo} - ${s.nome}` })),
                catchError(this.message.handleError<any>('getSuperintendenciasRelatorioImprodutivo')),
                take(1)
            );
    }

    getSucursaisRelatorioImprodutivo(): Observable<SelectItem[]> {
        return this.http.get<any[]>(`${this.baseUrl}/vistoria/improdutiva/sucursais`)
            .pipe(
                map(sucursais =>
                    sucursais.map(s => <SelectItem>{ value: s, label: s.descricao })),
                catchError(this.message.handleError<any>('getSucursaisRelatorioImprodutivo')),
                take(1)
            );
    }

    getDatasRelatorioImprodutivo(): Observable<SelectItem[]> {
        return this.http.get<any[]>(`${this.baseUrl}/vistoria/improdutiva/datas`)
            .pipe(
                catchError(this.message.handleError<any>('getDatasRelatorioImprodutivo')),
                take(1)
            );
    }

    getRelatorioImprodutivo(filtro: any): Observable<RelatorioImprodutividade> {
        return this.http.post<RelatorioImprodutividade>(`${this.baseUrl}/vistoria/improdutiva/pesquisa`, filtro)
            .pipe(
                catchError(this.message.handleError<RelatorioImprodutividade>('getRelatorioImprodutivo')),
                take(1)
            );
    }

    getRelatorioImprodutivoPorId(id: number): Observable<RelatorioImprodutividadeCorretor> {
        return this.http.get<RelatorioImprodutividadeCorretor>(`${this.baseUrl}/vistoria/improdutiva/${id}`)
            .pipe(
                catchError(this.message.handleError<RelatorioImprodutividadeCorretor>('getRelatorioImprodutivoPorId')),
                take(1)
            );
    }

    getLaudosAdicionais(filtro: any): Observable<LoteLaudoImprodutivoDetalheAux[]> {
        return this.http.post<LoteLaudoImprodutivoDetalheAux[]>(`${this.baseUrl}/vistoria/improdutiva/laudos/adicionais`, filtro)
            .pipe(
                catchError(this.message.handleError<LoteLaudoImprodutivoDetalheAux[]>('getLaudosAdicionais')),
                take(1)
            );
    }

    salvarDetalheLote(id: number, req: RelatorioImprodutividadeCorretor): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/vistoria/improdutiva/${id}`, req)
            .pipe(
                catchError(this.message.handleError<any>('salvarDetalheLote')),
                take(1)
            );
    }

    salvarLotes(req: RelatorioImprodutividade): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/vistoria/improdutiva`, req)
            .pipe(
                catchError(this.message.handleError<any>('salvarLotes')),
                take(1)
            );
    }

    transmitirLotes(req: RelatorioImprodutividade): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/vistoria/improdutiva/transmissao`, req)
            .pipe(
                catchError(this.message.handleError<any>('transmitirLotes')),
                take(1)
            );
    }

    calcularDetalheLote(relatorio: RelatorioImprodutividadeCorretor, loteImprodutivoAux: LoteLaudoImprodutivoAux, listaLoteDetalheAdicional: LoteLaudoImprodutivoDetalheAux[]): void {
        const listaLoteDetalhe = loteImprodutivoAux.listaLoteDetalhe;
        var qtdTotalLaudoRetirado = 0;
        var valorTotalLaudoRetirado = 0;

        listaLoteDetalhe.forEach(detalhe => {
            if ('S' == detalhe.loteLaudoImprodutivoDetalhe.icExclu) {
                valorTotalLaudoRetirado += detalhe.loteLaudoImprodutivoDetalhe.vlLaudo;
                qtdTotalLaudoRetirado += 1;
            }
        });

        loteImprodutivoAux.qtdTotalLaudoRetirado = qtdTotalLaudoRetirado;
        loteImprodutivoAux.valorTotalLaudoRetirado = valorTotalLaudoRetirado;

        // * Calculados
        const valorTotalLaudoCalculado = loteImprodutivoAux.valorTotalLaudoCalculado - valorTotalLaudoRetirado;
        const qtdTotalLaudoCalculado = loteImprodutivoAux.qtdTotalLaudoCalculado - qtdTotalLaudoRetirado;

        loteImprodutivoAux.valorTotalLaudoCalculado = valorTotalLaudoCalculado;
        loteImprodutivoAux.qtdTotalLaudoCalculado = qtdTotalLaudoCalculado;

        // * Verifica se ainda esta dentro da franquia
        if (qtdTotalLaudoCalculado > 0) {
            loteImprodutivoAux.icFranqAux = 'N';
        } else {
            loteImprodutivoAux.icFranqAux = 'S';
        }

        // * Recalcula INCLUIDOS/ESTORNADOS
        var qtdTotalLaudoIncluido = 0;
        var qtdTotalLaudoEstornado = 0;

        var valorTotalLaudoIncluido = 0;
        var valorTotalLaudoEstornado = 0;

        const listaLoteDetalheAdicionalAux: any[] = [];

        if (listaLoteDetalheAdicional?.length > 0) {
            listaLoteDetalheAdicional.forEach(detalhe => {
                // * Remove Laudos Adicionais 'Checados' (S) = exclusao
                if ('N' == detalhe.removerLaudo) {

                    listaLoteDetalheAdicionalAux.push(detalhe);

                    if ('C' == detalhe.loteLaudoImprodutivoDetalhe.cdTipoLaudo) {
                        qtdTotalLaudoIncluido += 1;
                        valorTotalLaudoIncluido += detalhe.loteLaudoImprodutivoDetalhe.vlLaudo;
                    } else {
                        qtdTotalLaudoEstornado += 1;
                        valorTotalLaudoEstornado += detalhe.loteLaudoImprodutivoDetalhe.vlLaudo;
                    }
                }
            });

            listaLoteDetalheAdicional.splice(0, listaLoteDetalheAdicional.length);
            listaLoteDetalheAdicionalAux.forEach(detalhe => listaLoteDetalheAdicional.push(detalhe));
        }

        loteImprodutivoAux.qtdTotalLaudoIncluido = qtdTotalLaudoIncluido;
        loteImprodutivoAux.qtdTotalLaudoEstornado = qtdTotalLaudoEstornado;
        loteImprodutivoAux.valorTotalLaudoIncluido = valorTotalLaudoIncluido;
        loteImprodutivoAux.valorTotalLaudoEstornado = valorTotalLaudoEstornado;

        // * Recupera Somatorio Final de Improdutivas.(Calculados + Incluidos - Estornados)
        this.calcularTotalFinalImprodutiva(loteImprodutivoAux);

        // relatorio.relatorioImprodutividade.loteImprodutivoAux = loteImprodutivoAux;
        relatorio.exibirPesquisaAdicional = false;
    }

    /**
     * Recupera Somatorio Final de Improdutivas.(Calculados + Incluidos - Estornados)
     */
    calcularTotalFinalImprodutiva(loteLaudoImprodutivoAux: any): void {

        var valorTotalLaudoCalculado = 0;
        var qtdTotalLaudoCalculado = 0;

        // * Somar Total Calculado senão estiver dentro da franquia
        if ('N' == loteLaudoImprodutivoAux.icFranqAux) {
            valorTotalLaudoCalculado = loteLaudoImprodutivoAux.valorTotalLaudoCalculado;
            qtdTotalLaudoCalculado = loteLaudoImprodutivoAux.qtdTotalLaudoCalculado;
        }

        const valorTotalIncluido = loteLaudoImprodutivoAux.valorTotalLaudoIncluido;
        const valorTotalEstornado = loteLaudoImprodutivoAux.valorTotalLaudoEstornado;
        const valorTotalFinal = valorTotalLaudoCalculado + valorTotalIncluido - valorTotalEstornado;

        loteLaudoImprodutivoAux.valorTotalImprodutivoFinal = valorTotalFinal;

        loteLaudoImprodutivoAux.qtdTotalLaudoCalculado = qtdTotalLaudoCalculado;
        loteLaudoImprodutivoAux.valorTotalLaudoCalculado = valorTotalLaudoCalculado;
    }
}