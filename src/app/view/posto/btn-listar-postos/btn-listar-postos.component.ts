import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'btn-listar-postos',
  templateUrl: './btn-listar-postos.component.html'
})
export class BtnListarPostosComponent implements OnInit {

  @Input()
  codigoPrestadora?: number = 0;

  @Input()
  label?: Boolean = false;

  @Input()
  listagem?: Boolean = false;

  @Input()
  class?: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  listarPostos() {
    this.router.navigate([`/posto/prestadora/${this.codigoPrestadora}`], { state: { listagem: this.listagem } });
  }

}

@NgModule({
  declarations: [
    BtnListarPostosComponent
  ],
  exports: [
    BtnListarPostosComponent
  ],
  imports: [
    ButtonModule
  ]
})
export class BtnListarPostosModule { }