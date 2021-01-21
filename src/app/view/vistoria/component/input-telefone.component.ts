import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Telefone } from '../model/telefone';

@Component({
  selector: 'app-input-telefone',
  template: `<label [class]="labelClass">Telefone:</label>
            <div class="p-col">
              <ng-template ngFor let-t [ngForOf]="_telefones" let-i="index"
                [ngForTrackBy]="trackById">
                <div class="p-grid">
                  <div [class]="dddClass">
                    <input type="text" pInputText pKeyFilter="pint" [(ngModel)]="_telefones[i].ddd"
                    maxlength="2" (input)="update()"/>
                  </div>
                  <div class="p-col">
                    <div class="ui-inputgroup w-100">
                      <input type="text" pInputText pKeyFilter="pint" [(ngModel)]="_telefones[i].telefone"
                      maxlength="9" (input)="update()"/>
                      <button *ngIf="i == 0" pButton (click)="add()" type="button" icon="pi pi-plus"
                      class="ui-button-success"></button>
                      <button *ngIf="i > 0" pButton (click)="remove(i)" type="button" icon="pi pi-times"
                      class="ui-button-danger"></button>
                    </div>
                  </div>
                </div>
              </ng-template>
            </div>`
})
export class InputTelefoneComponent implements OnInit {

  public _telefones: Telefone[]

  @Input() labelClass = 'label-2';
  @Input() dddClass = 'p-col-2';

  @Input() set model(model: Telefone[]) {
    if (!model) {
      model = [new Telefone()];
    }

    this._telefones = model;
  }

  @Output() updateModel = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  update() {
    this.updateModel.emit(this._telefones);
  }

  add() {
    this._telefones.push(new Telefone());
    this.update();
  }

  remove(index: number) {
    this._telefones.splice(index, 1);
    this.update();
  }

  trackById(index: number): number { return index; }
}
