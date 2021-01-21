import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';

import { ParametroRoutingModule } from './parametro-routing.module';
import { CalendarBrModule } from '../../directive/calendar-br.directive';
import { DropdownUfModel } from '../../directive/dropdown-uf.directive';
import { RegiaoTarifariaService } from '../../service/regiao-tarifaria.service';
import { MunicipioService } from '../../service/municipio-service';
import { PecasService } from '../../service/pecas.service';
import { AvariasService } from '../../service/avarias.service';
import { PrestadoraVistoriaService } from '../prestadora/prestadora-module/prestadora-vistoria-service';
import { RegiaoTarifariaComponent } from './regiao-tarifaria/regiao-tarifaria.component';
import { PecasCrudComponent } from './pecas/pecas-crud.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AvariasCrudComponent } from './avarias/avarias-crud.component';
import { MotivoDispensaService } from '../../service/motivo-dispensa.service';
import { MotivoDispensaCrudComponent } from './motivos-dispensa/motivos-dispensa-crud.component';
import { AcessoriosCrudComponent } from './acessorios/acessorios-crud.component';
import { AcessoriosService } from './../../service/acessorios.service';


@NgModule({
    declarations: [
        RegiaoTarifariaComponent,
        PecasCrudComponent,
        AvariasCrudComponent,
        MotivoDispensaCrudComponent,
        AcessoriosCrudComponent
    ],
    imports: [
        CommonModule,
        ParametroRoutingModule,
        FormsModule,
        PanelModule,
        TableModule,
        ButtonModule,
        DialogModule,
        CalendarModule,
        InputTextModule,
        DynamicDialogModule,
        FieldsetModule,
        CheckboxModule,
        KeyFilterModule,
        DropdownModule,
        TabViewModule,
        ReactiveFormsModule,
        TooltipModule,

        CalendarBrModule,
        DropdownUfModel
    ],
    providers: [
        RegiaoTarifariaService,
        PrestadoraVistoriaService,
        MunicipioService,
        PecasService,
        AvariasService, 
        MotivoDispensaService,
        AcessoriosService
    ]
})
export class ParametroModule { }
