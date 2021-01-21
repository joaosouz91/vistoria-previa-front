import { AgendamentoDomicilio } from './agendamento-domicilio';
import { Telefone } from './telefone';
import { Prestadora } from '../../prestadora/prestadora';
import { Vistoria } from './vistoria';

export class Agendamento {

    voucher: string;
    codigoPrestadora: number;
    codigoPosto: number;
    voucherAnterior: string;
    observacao: string;
    dataUltimaAlteracao: Date;
    tipo: any;

    telefones?: Telefone[];
    emails?: string[];
    contato: string;
    statusPendente: any
    status: any
    agendamentoDomicilio: AgendamentoDomicilio;

    prestadora?: Prestadora;

    vistoria?: Vistoria;

    laudo?: any;

    idsVistorias?: number[];
}