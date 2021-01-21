import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SelectItem } from 'primeng/api/selectitem';

@Injectable({
    providedIn:'root'
})
export class CarroceriaService{

    constructor(){}

    getCarroceria(){

        return of<SelectItem>(
            {value:18064, label:'BASCULANTE'},
            {value:18069, label:'BETONEIRA'},
            {value:18070, label:'CANAVIEIRO'},
            {value:18071, label:'CEGONHEIRA'},
            {value:18072, label:'PLATAFORMA GUINCHO'},
            {value:18073, label:'PORTA CONTEINER'},
            {value:18074, label:'TANQUE'},
            {value:18075, label:'OUTRAS'},
            {value:18076, label:'NAO POSSUI'},
            {value:18082, label:'NAO INFORMADO'},
            {value:18698, label:'CAÇAMBA REMOVIVEL'},
            {value:18699, label:'GAIOLA/BOIADEIRA'},
            {value:18700, label:'COLETOR DE LIXO'},
            {value:18701, label:'SILO'},
            {value:18759, label:'FECHADA DE MADEIRA'},
            {value:18760, label:'PRANCHA'},
            {value:18065, label:'ABERTA DE FERRO/AÇO/ALUMINIO'},
            {value:18066, label:'ABERTA DE MADEIRA/GRANELEIRA'},
            {value:18067, label:'BAU DE ALUMINIO/LONADO/SIDER'},
            {value:18068, label:'BAU ISOTERMICO/FRIGORIFICO'}
            );
    }
}