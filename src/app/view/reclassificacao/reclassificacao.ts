import { ComboNovoStatus } from "./combo-novo-status";
import { ParecerTecnicoVistoriaPrevia } from "./parecer-tecnico-vistoria-previa";

export class Reclassificacao {

    vistoria: string;
	empresaVistoriadora: number;
	dataTransmissao: Date; 
	dataVistoria: Date;
	chassi: string;
	placa: string;	
	crlv: string;
	expedido: Date;
	anoModelo: number;
	nomeCrlv: string;	
	cprfCnpj: number;
	statusLaudo: string;
	comboNovoStatusList: ComboNovoStatus[];
	parecerTecnicoVistoriaPrevias: ParecerTecnicoVistoriaPrevia[];
	versaoLaudo:number;
	tipoHistorico: string;	
}