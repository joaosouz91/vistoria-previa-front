import { NgModule } from '@angular/core';
import { VistoriaComponent } from './vistoria-consultar/vistoria.component';
import { VistoriaRoutingModule } from './vistoria-routing.module';
import { VistoriaService } from './vistoria.service';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import { VistoriaVisualizarComponent } from './vistoria-visualizar/vistoria-visualizar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { VistoriaAgendarComponent } from './vistoria-agendar/vistoria-agendar.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputEmailComponent } from './component/input-email.component';
import { InputTelefoneComponent } from './component/input-telefone.component';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarBrModule } from '../../directive/calendar-br.directive';
import { DropdownUfModel } from '../../directive/dropdown-uf.directive';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AceitacaoService } from '../../service/aceitacao-service';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { AgendamentoService } from './agendamento.service';
import { MessageModule } from 'primeng/message';
import { VistoriaFiltroSession } from './component/vistoria.filtro.session';
import { PostoModule } from '../posto/posto-module/posto.module';
import { VistoriaDomicilioComponent } from './component/vistoria-domicilio/vistoria-domicilio.component';
import { VistoriaFrotaComponent } from './component/vistoria-frota/vistoria-frota.component';
import { DropdownLocalVistoriaModule } from '../../directive/dropdown-local-vistoria.directive';
import { AgendamentoSantanderComponent } from './agendamento/agendamento-santander/agendamento-santander.component';
import { InputCpfCnpjModule } from '../../directive/input-cpf-cnpj.module';
import { MunicipioService } from '../../service/municipio-service';
import { RegiaoTarifariaService } from '../../service/regiao-tarifaria.service';
import { PrestadoraVistoriaService } from '../prestadora/prestadora-module/prestadora-vistoria-service';
import { LaudosTransmitidosConsultaComponent } from './laudos-transmitidos-consulta/laudos-transmitidos-consulta.component';
import { LaudosTransmitidosDetalheComponent } from './laudos-transmitidos-detalhe/laudos-transmitidos-detalhe.component';
import { LaudosTransmitidosInconsistenciaComponent } from './laudos-transmitidos-inconsistencias/laudos-transmitidos-inconsistencias.component';
import { KeysPipe } from './laudos-transmitidos-detalhe/keys.pipe';

import { CustomPipesModule } from '../../pipes/custom-pipes.module';

@NgModule({
  declarations: [
    VistoriaComponent,
    VistoriaVisualizarComponent,
    VistoriaAgendarComponent,
    InputEmailComponent,
    InputTelefoneComponent,
    VistoriaDomicilioComponent,
    VistoriaFrotaComponent,
    AgendamentoSantanderComponent,
    LaudosTransmitidosConsultaComponent,
    LaudosTransmitidosDetalheComponent,
    LaudosTransmitidosInconsistenciaComponent,
    KeysPipe
  ],
  imports: [
    CommonModule,
    VistoriaRoutingModule,
    FormsModule,
    KeyFilterModule,
    FieldsetModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    RadioButtonModule,
    CheckboxModule,
    ConfirmDialogModule,
    InputMaskModule,
    DialogModule,
    TooltipModule,
    MessageModule,
    PostoModule,
    DropdownUfModel,
    DropdownLocalVistoriaModule,
    InputCpfCnpjModule,
    CalendarBrModule,
    CustomPipesModule
  ],
  providers: [
    VistoriaService,
    AgendamentoService,
    ConfirmationService,
    AceitacaoService,
    DatePipe,
    VistoriaFiltroSession,
    MunicipioService,
    RegiaoTarifariaService,
    PrestadoraVistoriaService
  ]
})
export class VistoriaModule { }
