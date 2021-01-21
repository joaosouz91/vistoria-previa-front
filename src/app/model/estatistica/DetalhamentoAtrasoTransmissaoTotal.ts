export class DetalhamentoAtrasoTransmissaoTotal {

    codigoLaudo: string;
    codigoPrestadora: number;
    codigoEmpresa: string;
    nomeEmpresa: string;
    dataTransmissao: Date;
    dataVistoria: Date;
    mes: number;
    atrasoDias: number;

    quantidadeAteDois: number;
    quantidadeAteTres: number;
    quantidadeMaiorTres: number;
    totalRegistros: number;

    porcentagemAteDois: number;
    porcentagemAteTres: number;
    porcentagemMaiorTres: number;

    totalAteDoisDias: number;
    totalAteTresDias: number;
    totalMaiorTresDias: number;
    totalGeral: number;
    totalPorcentagemAteDoisDias: number;
    totalPorcentagemAteTresDias: number;
    totalPorcentagemMaiorTresDias: number;

}