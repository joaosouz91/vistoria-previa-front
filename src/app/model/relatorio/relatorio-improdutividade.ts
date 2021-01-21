import { LoteLaudoImprodutivoAux } from './lote-laudo-improdutivo-aux';

export class RelatorioImprodutividade {
    dataReferencia: Date;
    descricaoDataReferencia: string;
    valorTotalImprodutivoFinal: number;
    valorTotalImprodutivoOriginal: number;
    valorTotalLaudoCalculado: number;
    valorTotalLaudoIncluido: number;
    valorTotalLaudoEstornado: number;
    qtdTotalImprodutivoOriginal: number;
    qtdTotalLaudoCalculado: number;
    qtdTotalLaudoIncluido: number;
    qtdTotalLaudoEstornado: number;
    listaLoteImprodutivoAux: LoteLaudoImprodutivoAux[];
    permiteEdicao: boolean;
    permiteTransmissao: boolean;
}