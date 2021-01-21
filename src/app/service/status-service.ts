import { Observable, of } from 'rxjs';
import { StatusLaudo } from '../model/status-laudo';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
  })
export class StatusLaudoService{

    constructor() { }

    getStatusLaudo():Observable<StatusLaudo>{

        return of<StatusLaudo>(
            { codigo: 'ACEITÁVEL', descricao: 'A' } , 
            { codigo: 'RECUSADO', descricao: 'R' }, 
            { codigo: 'ACEITAÇÃO FORÇADA', descricao: 'AF' }, 
            { codigo: 'SUJEITO À ANALISE', descricao: 'S' }, 
            { codigo: 'FRUSTRADA', descricao: 'F' },
            { codigo: 'ACEITAÇÃO LIBERADA', descricao: 'L' },
        );
    }
}