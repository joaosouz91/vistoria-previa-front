import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { SimpleDatePickerComponent } from './simple-date-picker/simple-date-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PanelModule,
        DropdownModule,
        ButtonModule,
        InputTextareaModule,
        TableModule
    ],
    declarations: [
        SimpleDatePickerComponent
    ], exports : [
        CommonModule,
        SimpleDatePickerComponent
    ]
})
export class CommonUtilsModule { }
