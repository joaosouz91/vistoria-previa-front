import { Injectable } from '@angular/core';
import { Vistoria } from '../../model/vistoria';

@Injectable()
export class VistoriaFrotaService {
  
  constructor() { }
  
  itensFrotaSelecionados: Vistoria[];
  frota: Vistoria[];
}
