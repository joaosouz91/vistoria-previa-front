import { Resource } from '../../model/resource';

export class Prestadora implements Resource{
    links: any[];

    dataCadastramento: Date;
    dataDesativacao: Date;
    dataFimSelec: Date;
    dataInicioAtividade: Date;
    dataInicioSelec: Date;
    dataUltimaAlteracao: Date;
    
    codigoPrestadora: number;
    cep: number;
    numeroLogradouro: number;
    percentualDistribuicao: number;
    
    cpfCnpj: string;
    ramal: string;
    telefoneComercial: string;
    uf: string;
    tipoPessoa: string;
    dddTelefone: string;
    email: string;
    voucher: string;
    usuarioUltimaAlteracao: string;
    complemento: string;
    site: string;
    bairro: string;
    cidade: string;
    contato: string;
    logradouro: string;
    razaoSocial: string;
}