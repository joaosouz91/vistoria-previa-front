import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-simple-date-picker',
  templateUrl: './simple-date-picker.component.html',
  styleUrls: ['./simple-date-picker.component.scss']
})
export class SimpleDatePickerComponent implements OnInit {

  years: SelectItem[] = [];
  months: SelectItem[] = [];
  currentDate: Date = new Date();

  selectedYear: SelectItem = null;
  selectedMonth: SelectItem = null;

  @Output() onMonthChange = new EventEmitter();

  constructor() { 
 
    for(let i = this.currentDate.getFullYear(); i >= 1990; i--) {
      this.years.push({label: i.toString(), value: i});
    }

  }

  ngOnInit() { }

  setMonths(){
    this.months = [];
    this.selectedMonth = null;
    for (let i = 1; i <= 12; i++) {
      this.months.push({label : i.toString(), value: i});
      if(this.selectedYear.value === this.currentDate.getFullYear() && i === this.currentDate.getMonth()+1) {
        break;
      }
    }
    this.emitDate({'year' : 0,'month' : 0});
  }

  emitDate(date){
    if(date !== null) {
      this.onMonthChange.emit(date);
    } else {
      this.onMonthChange.emit({
        'year' : `${this.selectedYear.value}`,
        'month' : this.getSelectedMonthAsString()
      });
    }
      
  }

  getSelectedMonthAsString() {
    console.log();
    return `${this.selectedMonth.value}`.length > 1 ? 
    `${this.selectedMonth.value}`:`0${this.selectedMonth.value}`;
  }

}
