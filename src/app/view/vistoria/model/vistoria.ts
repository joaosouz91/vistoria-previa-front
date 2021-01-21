import { Resource } from '../../../model/resource';
import { Corretor } from '../../../model/corretor';
import { Agendamento } from './agendamento';

export class Vistoria implements Resource {
    links: any[];

    id: number;
    sistemaChamador: number;
    negocio: number;
    item: number;
    endosso: number;
    calculo: number;
    nomeCliente: string;
    cpfCnpj: string;
    codCorretor: number;
    tipoVeiculo: any;
    nomeFabricante: string;
    nomeModelo: string;
    fipe: string;
    placa: string;
    chassi: string;
    anoModelo: string;
    zeroKM: boolean;
    carroceria: boolean;
    tipoCarroceria: string;
    adaptacaoEixo: string;
    frota: boolean;
    observacao: string;
    logradouro: string;
    numeroLogradouro: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    cidadeProvavel: string;
    uf: string;
    dataUltimaAlteracao: Date;
    voucher: string;
    codigoFabricante: number;
    codigoModelo: number;

    agendamento: Agendamento;
    corretor?: Corretor;

    emailCliente?: string;
    telefoneCliente?: string;

    icMbile: String;
}