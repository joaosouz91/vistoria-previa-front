import { Directive, Host, Optional, Self, NgModule, Input, OnInit, OnDestroy } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { Subscription } from 'rxjs';

@Directive({
  selector: 'p-calendar'
})
export class CalendarBrDirective implements OnInit, OnDestroy {

  @Input() showButtonBar = true;
  @Input() showIcon = true;
  @Input() appendTo = 'body';
  @Input() dateFormat = 'dd/mm/yy';

  subscriptions: Subscription[];

  constructor(@Host() @Self() @Optional() public host: Calendar) {
  }

  ngOnInit(): void {
    this.host.showIcon = this.showIcon;
    this.host.showButtonBar = this.showButtonBar;
    this.host.appendTo = this.appendTo
    this.host.dateFormat = this.dateFormat;

    this.host.locale = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today: 'Hoje',
      clear: 'Limpar'
    };

    this.subscriptions = [
      this.host.onSelect.subscribe((d) => this.transformDateToZone(d)),
      this.host.onInput.subscribe(event => {
        if (this.host.value) { //this means the input was accepted as valid
          this.transformDateToZone(this.host.value);//we should transform the date
        }
      })
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  transformDateToZone(capturedDate: Date) {//strip timezone from date and force into configured zone
    let model;
    
    if ('range' == this.host.selectionMode) {
      if (this.host.value[0] != null) {
        this.host.value[0] = this.formatDate(this.host.value[0]);
      }

      if (this.host.value[1] != null) {
        this.host.value[1] = this.formatDate(this.host.value[1]);
      }

      model = this.host.value;

    } else {
      model = this.formatDate(capturedDate);
    }

    console.log(model);

    this.host.updateModel(model);//this is a private api. In the future, we'll try to avoid using it.
  }

  private formatDate(data: Date): Date {
    const d = `${data.toISOString().split('T')[0]}T00:00:00-03:00`;
    return new Date(d);
  }
}

@NgModule({
  declarations: [
    CalendarBrDirective
  ],
  exports: [CalendarBrDirective]
})
export class CalendarBrModule { }