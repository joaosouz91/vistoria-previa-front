import { Injectable } from '@angular/core';
import { FiltroAgendamento } from '../model/filtro-agendamento';

@Injectable({
  providedIn: 'root'
})
export class VistoriaFiltroSession {
  
  public filtro: FiltroAgendamento;
}
