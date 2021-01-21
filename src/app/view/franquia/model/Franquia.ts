import { Resource } from '../../../model/resource';

export class Franquia implements Resource{


	links: any[];

	codigo:string;
	nome:string;
	ativo:string;
	cdAgrmtVspre:number;
	pagKmRodado:string;
	qtKmFrqdo:number;
	tipoPessoa:string;
	cpfCnpj:string;
	logradouro:string;
	numLogradouro:number;
	dsCmploLogra:string;
	bairro:string;
	cidade:string;
	uf:string;
	cep:number;
	dddTel:string;
	telEmpresa:string;
	ramal:string;
	contato:string;
	email:string
	usuarioUltimaAlteracao:string;
	dataUltimaAlter:Date;
	dataInicio:Date;
	dataFim:Date;
	codigoPrestadora: Number
}