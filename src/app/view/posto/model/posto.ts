import { Resource } from '../../../model/resource';
import { Prestadora } from '../../prestadora/prestadora';

export class Posto implements Resource {
    links: any[];

    codigoPrestadora: number;
    codigoPosto: number;
    nome: string;
    email:string;
    telefone:string;
    ativo:boolean;
    funcionamento:string;
    atendeVeiculoCarga:boolean;
    logradouro:string;
    bairro: string;
    cidade:string;
    uf:string;
    cep:number;
    logradouroReferencia:string;

    prestadora?: Prestadora;
}