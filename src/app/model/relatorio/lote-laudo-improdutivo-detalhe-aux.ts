import { LoteLaudoImprodutivoDetalhe } from './lote-laudo-improdutivo-detalhe';

export class LoteLaudoImprodutivoDetalheAux {
    loteLaudoImprodutivoDetalhe: LoteLaudoImprodutivoDetalhe;
    icLoteRetirado: string;
    icLoteFranquia: string;
    codLaudo: string;
    dataLaudo: Date;
    codStatusLaudo: string;
    descStatusLaudo: string;
    codMotivoImprodutiva: string;
    descMotivoImprodutiva: string;
    codVoucher: string;
    numPlaca: string;
    numChassi: string;
    adicionarLaudo: string;
    removerLaudo: string;
    loteDentroFranquia: boolean;
    loteEnviado: boolean;
    loteRetirado: boolean;
    retirado: boolean;
}