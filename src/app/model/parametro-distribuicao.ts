import { Prestadora } from 'app/view/prestadora/prestadora';
import { RegiaoAtendimento } from './regiao-atendimento';

export class ParametroDistribuicao {

    id: number;
    codigoPrestadora: number;
    codigoRegiaoTarifaria: number;
    usuarioUltimaAlteracao: string;
    dataFimVigencia: Date;
    dataInicioVigencia: Date;
    dataUltimaAlteracao: Date;
    capital: string;
    percentualDistribuicao: number;
    idRegiaoAtnmtVstro: number;

    prestadora: Prestadora;
    regiao: RegiaoAtendimento;
}