import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-laudo-visualizar-dialog',
  templateUrl: './laudo-visualizar-dialog.component.html',
  styleUrls: ['./laudo-visualizar-dialog.component.css']
})
export class LaudoVisualizarDialogComponent implements OnInit {

  CODIGO_LVPRE: string;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.CODIGO_LVPRE = this.config.data.id;
  }
  
  closeDialog() {
    this.ref.close();
  }

}
