import { Veiculo } from './veiculo';

import { Proponente } from './proponente';
import { LaudoVistoria } from './laudo-vistoria';
import { Parecer } from './parecer';




export class LaudoFull {
         
     CODIGO_LVPRE: string;

     laudo: LaudoVistoria;
     veiculo: Veiculo;
     proponente:Proponente;
     acessorios:Array<any>;
     equipSegur:Array<any>;
     avarias:Array<any>;
     infTech:Array<any>;
     propostasVinculadas:Array<any>;
     equipamentos:Array<any>;
     itens:Array<any>;
     pareceres:Parecer[];
     isBloqueado:boolean;
     menssagemBloqueado:string;
     dataFatura: Date;
     editar: String;
     agencia: String;
     

        
    }


