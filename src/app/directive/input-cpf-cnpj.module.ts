import { NgModule, Component, ElementRef, OnInit, OnDestroy, Input, forwardRef, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


export const INPUTMASK_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputCpfCnpj),
  multi: true
};

@Component({
  selector: 'p-inputCpfCnpj',
  template: `<input #input pInputText [attr.id]="inputId" [attr.type]="type" [attr.name]="name" [attr.maxlength]="maxlength" [ngStyle]="style" [ngClass]="styleClass" 
              (keypress)="handleInputChange($event)" (input)="onInputChange($event)" (paste)="handleInputChange($event)">`,
  providers: [INPUTMASK_VALUE_ACCESSOR]
})
export class InputCpfCnpj implements OnInit, OnDestroy, ControlValueAccessor {

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChangesss(event.target.value, true);
  }

  @Input() type: string = 'text';

  @Input() style: any;

  @Input() inputId: string;

  @Input() styleClass: string;

  maxlength: number = 18;

  @Input() name: string;

  @Input() unmask: boolean = true;

  @ViewChild('input') inputViewChild: ElementRef;

  @Output() onComplete: EventEmitter<any> = new EventEmitter();

  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  @Output() onInput: EventEmitter<any> = new EventEmitter();

  value: any;

  onModelChange: Function = () => { };

  onModelTouched: Function = () => { };

  input: HTMLInputElement;

  constructor(public el: ElementRef) { }

  ngOnInit() {
  }

  writeValue(value: any): void {
    this.value = value;

    if (this.inputViewChild && this.inputViewChild.nativeElement) {
      if (this.value == undefined || this.value == null)
        this.inputViewChild.nativeElement.value = '';
      else
        this.inputViewChild.nativeElement.value = this.value;
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  onInputChange(event) {
    this.handleInputChange(event);
    this.onInput.emit(event);
  }

  handleInputChange(event) {
    this.onInputChangesss(event.target.value, false);
  }

  getUnmaskedValue() {
    return this.inputViewChild.nativeElement.value.replace(/\D/g, '');
  }

  updateModel(e) {
    const updatedValue = this.unmask ? this.getUnmaskedValue() : e.target.value;
    if (updatedValue !== null || updatedValue !== undefined) {
      this.value = updatedValue;
      this.onModelChange(this.value);
    }
  }

  ngOnDestroy() {
  }

  onInputChangesss(event, backspace) {
    var newVal = event.replace(/\D/g, '');
    if (newVal.length == 0) {
      newVal = '';
      // 000.000.000-00
      // 00.000.000/0000-00
    } else if (newVal.length >= 4 && newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1.$2');
    } else if (newVal.length >= 7 && newVal.length <= 9) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})/, '$1.$2.$3');
    } else if (newVal.length >= 10 && newVal.length <= 11) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1.$2.$3-$4');
    } else if (newVal.length == 12) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})/, '$1.$2.$3/$4');
    } else if (newVal.length > 12 && newVal.length <= 14) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/, '$1.$2.$3/$4-$5');
    }
    this.inputViewChild.nativeElement.value = newVal;
    this.updateModel(newVal);
    this.onComplete.emit();
  }
}

@NgModule({
  imports: [CommonModule, InputTextModule],
  exports: [InputCpfCnpj],
  declarations: [InputCpfCnpj]
})
export class InputCpfCnpjModule { }