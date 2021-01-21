import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CepPipe } from './cep.pipe';
import { CpfCnpjPipe } from './cpfCnpj.pipe';
import { LaudoSituacaoPipe } from './laudo-situacao.pipe';
import { SimNaoPipe } from './sim-nao.pipe';
import { TipoCorPipe } from './tipo-cor.pipe';
import { TipoCambioPipe } from './tipo-cambio.pipe';
import { FormatoCarroceriaPipe } from './formato-carroceria.pipe';



@NgModule({
  declarations: [
    CepPipe,
    CpfCnpjPipe,
    FormatoCarroceriaPipe,
    LaudoSituacaoPipe,
    SimNaoPipe,
    TipoCambioPipe,
    TipoCorPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CepPipe,
    CpfCnpjPipe,
    FormatoCarroceriaPipe,
    LaudoSituacaoPipe,
    SimNaoPipe,
    TipoCambioPipe,
    TipoCorPipe
  ]
})
export class CustomPipesModule { }
