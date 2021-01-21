import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TipoSeguro } from '../model/tipo-seguro';
import { take } from 'rxjs/operators';



@Injectable({
    providedIn:'root'
})
export class TipoSeguroService{

    constructor(){}


    getTipoSeguro():Observable<TipoSeguro>{

        return of<TipoSeguro>(
            {codigo: '1', descricao: 'SEGURO NOVO'},
            {codigo: '2', descricao: 'RENOV. CONGENERE COM SINISTRO'},
            {codigo: '3', descricao: 'RENOV. CONGENERE SEM SINISTRO '},
            {codigo: '4', descricao: 'RENOV. TOKIO COM SINISTRO'},
            {codigo: '5', descricao: 'RENOV. TOKIO SEM SINISTRO'},

        );
    }

}