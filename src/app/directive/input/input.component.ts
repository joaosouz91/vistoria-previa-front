import { Component, OnInit, AfterContentInit, Input, ContentChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'vp-input-container',
  templateUrl: './input.component.html'
})
export class InputComponente  implements OnInit ,AfterContentInit{

  input:any;
  @Input() label:string;
  @Input() erroMessage:string;


  @ContentChild(NgModel) model :NgModel
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.input = this.model

    if(this.input === undefined){

      throw new Error('Esse componente precisa ser usado com uma diretiva NgModel');
    }
  }

}
