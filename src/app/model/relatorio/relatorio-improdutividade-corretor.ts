import { SelectItem } from 'primeng/api';
import { LoteLaudoImprodutivoAux } from './lote-laudo-improdutivo-aux';

export class RelatorioImprodutividadeCorretor {
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

    loteImprodutivoAux: LoteLaudoImprodutivoAux;

    permiteEdicao: boolean;
    permiteTransmissao: boolean;
    exibirPesquisaAdicional: boolean;

    listaMesAnoAdicional: SelectItem[];
}