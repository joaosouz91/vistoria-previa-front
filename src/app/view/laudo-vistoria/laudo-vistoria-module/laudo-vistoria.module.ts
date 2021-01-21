import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { BlockUIModule } from 'primeng/blockui';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ListboxModule } from 'primeng/listbox';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { LaudoVistoriaRoutingModule } from './laudo-vistoria-routing.module';
import { PrestadoraVistoriaService } from '../../prestadora/prestadora-module/prestadora-vistoria-service';
import { LaudoVisualizarComponent } from '../laudo-visualizar/laudo-visualizar.component';
import { LaudoVistoriaComponent } from '../laudo-consultar/laudo-vistoria.component';
import { LaudoEditarComponent } from '../laudo-editar/laudo-editar.component';
import { LaudoVistoriaService } from './laudo-vistoria-service';
import { ComboService } from '../../../service/combos-services';
import { CorretorService } from '../../../service/corretor-service';
import { LaudoVisualizarTabsComponent } from '../laudo-visualizar-tabs/laudo-visualizar-tabs.component';
import { LaudoVisualizarDialogComponent } from '../laudo-visualizar-dialog/laudo-visualizar-dialog.component';
import { CustomPipesModule } from '../../../pipes/custom-pipes.module';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarBrModule } from '../../../directive/calendar-br.directive';

@NgModule({
  declarations: [
    LaudoVistoriaComponent,
    LaudoEditarComponent, 
    LaudoVisualizarComponent,
    LaudoVisualizarTabsComponent,
    LaudoVisualizarDialogComponent
  ],
  imports: [
    CommonModule,
    LaudoVistoriaRoutingModule,
    FormsModule,
    KeyFilterModule,
    FieldsetModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    TableModule,
    PanelModule,
    CalendarModule,
    CalendarBrModule,
    TabViewModule,
    DropdownModule,
    BlockUIModule,
    DialogModule,
    ListboxModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    CustomPipesModule,
    CardModule,
    InputTextareaModule
  ],
  exports: [
    LaudoVisualizarDialogComponent
  ], 
  providers: [
    LaudoVistoriaService, 
    PrestadoraVistoriaService, 
    ComboService, 
    CorretorService, 
    ConfirmationService
  ]
})
export class LaudoVistoriaModule { }
