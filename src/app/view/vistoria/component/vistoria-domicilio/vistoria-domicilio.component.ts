import { Component, OnInit, Input } from '@angular/core';
import { VistoriaDomicilio } from './vistoria-domicilio';
import { Telefone } from '../../model/telefone';
import { AgendamentoService } from '../../agendamento.service';
import { SelectItem } from 'primeng/api/selectitem';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vistoria-domicilio',
  templateUrl: './vistoria-domicilio.component.html',
  styleUrls: ['./vistoria-domicilio.component.css']
})
export class VistoriaDomicilioComponent implements OnInit {

  constructor(private agendamentoService: AgendamentoService, private datepipe: DatePipe) { }

  @Input('model') vistoriaDomicilio = new VistoriaDomicilio();

  minDate: Date;
  maxDate: Date;
  periodoMinDate: string;

  periodos: SelectItem[];

  ngOnInit() {
    this.agendamentoService.obterDatasAgendamento(this.vistoriaDomicilio.agendamento.cidade).subscribe(resp => {
      this.minDate = new Date(`${resp.minDate}T00:00:00`);
      this.maxDate = new Date(`${resp.maxDate}T00:00:00`);
      console.log(this.minDate);
      this.periodoMinDate = resp.periodoVistoria;
    });
  }

  setNumeroLogradouroSN() {
    if (this.vistoriaDomicilio.isCheckboxSN) {
      this.vistoriaDomicilio.agendamento.numeroLogradouro = 'S/N';
    } else {
      this.vistoriaDomicilio.agendamento.numeroLogradouro = null;
    }
  }

  updateEmailsDomicilio(model: string[]) {
    this.vistoriaDomicilio.emails = model;
  }

  updateTelefonesDomicilio(model: Telefone[]) {
    this.vistoriaDomicilio.telefones = model;
  }

  carregarPeriodo() {
    this.periodos = [];
    this.vistoriaDomicilio.agendamento.periodoVistoria = null;

    let dataSelecionada = this.vistoriaDomicilio.agendamento.dataVistoria;

    //Se Sábado permite apenas período manhã
    if (dataSelecionada.getDay() == 6) {
      this.periodos = [{ label: 'Manhã', value: 'M' }];
      this.vistoriaDomicilio.agendamento.periodoVistoria = "M";

      //Se periodoMinDate for 'T' e a data selecionada for igual a data mínima permite apenas período tarde
    } else if (this.periodoMinDate == 'T' && dataSelecionada.getDate() == this.minDate.getDate()) {
      this.periodos = [{ label: 'Tarde', value: 'T' }];
      this.vistoriaDomicilio.agendamento.periodoVistoria = "T";

    } else {
      this.periodos = [
        { label: 'Comercial', value: 'C' },
        { label: 'Manhã', value: 'M' },
        { label: 'Tarde', value: 'T' },
      ]
    }
  }
}
