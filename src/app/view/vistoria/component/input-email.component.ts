import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-email',
  template: `<label [class]="labelClass">Email:</label>
            <div class="p-col">
              <ng-template ngFor let-e [ngForOf]="_emails" let-i="index" [ngForTrackBy]="trackById">
                <div class="p-grid">
                  <div class="p-col">
                    <div class="ui-inputgroup w-100">
                      <input type="text" pInputText [(ngModel)]="_emails[i]"
                        maxlength="100" (input)="update()" />
                      <button *ngIf="i == 0" pButton (click)="addEmail()" type="button" icon="pi pi-plus"
                        class="ui-button-success"></button>
                      <button *ngIf="i > 0" pButton (click)="removeEmail(i)" type="button" icon="pi pi-times"
                        class="ui-button-danger"></button>
                    </div>
                  </div>
                </div>
              </ng-template>
            </div>`
})
export class InputEmailComponent implements OnInit {

  _emails: string[];

  @Input() labelClass = 'label-2';

  @Input() set model(model: string[]) {
    if (!model) {
      model = [null];
    }

    this._emails = model;
  }

  @Output() updateModel = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  update() {
    this.updateModel.emit(this._emails);
  }

  addEmail() {
    this._emails.push(null);
    this.update();
  }

  removeEmail(index: number) {
    this._emails.splice(index, 1);
    this.update();
  }

  trackById(index: number): number { return index; }
}
