import { LoteLaudoImprodutivo } from './lote-laudo-improdutivo';
import { LoteLaudoImprodutivoDetalheAux } from './lote-laudo-improdutivo-detalhe-aux';

export class LoteLaudoImprodutivoAux {
    loteLaudoImprodutivo: LoteLaudoImprodutivo;
    nomeCorretor: string;
    listaLoteDetalhe: LoteLaudoImprodutivoDetalheAux[];
    listaLoteDetalheAdicional: LoteLaudoImprodutivoDetalheAux[];
    listaPesquisaLaudoAdicional: LoteLaudoImprodutivoDetalheAux[];
    qtdTotalVistoria: number;
    pctPermitidoImprodutiva: number;
    icFranqAux: string;
    valorTotalImprodutivoFinal: number;
    valorTotalImprodutivoOriginal: number;
    valorTotalLaudoCalculado: number;
    valorTotalLaudoRetirado: number;
    valorTotalLaudoIncluido: number;
    valorTotalLaudoEstornado: number;
    qtdTotalImprodutivoOriginal: number;
    qtdTotalLaudoCalculado: number;
    qtdTotalLaudoRetirado: number;
    qtdTotalLaudoIncluido: number;
    qtdTotalLaudoEstornado: number;
    retirado: boolean;
}