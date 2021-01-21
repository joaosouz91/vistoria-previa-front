import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageUtil } from '../../../service/message-util.service';

import { EstatisticaService } from '../estatistica.service';
import { take } from 'rxjs/operators';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-atrasos-transmissao-consulta',
  templateUrl: './atrasos-transmissao-consulta.component.html',
  styleUrls: ['./atrasos-transmissao-consulta.component.css']
})
export class AtrasosTransmissaoConsultaComponent implements OnInit {

    selectItens: SelectItem[] = [];
    idPrestadora: number;
    date: any;
    requiredFilled: boolean;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageUtil, private estatisticaService: EstatisticaService) {
        this.idPrestadora = null;
        this.date = { 'year': 0, 'month': 0 }
        this.requiredFilled = false;
    }

    ngOnInit() {
        this.estatisticaService.getPrestadoras(true).subscribe(
            response => {
                response.sort((a, b) => a.cdAgrmtVspre - b.cdAgrmtVspre);
                this.selectItens.push({label : `[TODAS]`, value : 0})
                response.forEach(
                    prestadoraVistoria => {
                        this.selectItens.push({
                            label: `${prestadoraVistoria.cdAgrmtVspre} - ${prestadoraVistoria.nmRazaoSocal}`,
                            value: prestadoraVistoria.cdAgrmtVspre
                        });
                    }
                );
            },
            error => {
                this.messageService.error('Servidor não encontrado!');
                console.log("Error: ", error);
            }
        );
    }

    onPesquisar() {
        this.router.navigate(['/estatistica/atrasos-transmissao-resultado'], {
            queryParams: { 
                idPrestadora: this.idPrestadora, 
                month: this.date.month, 
                year: this.date.year }
        });
    }

    onChangePrestadora() {
        this.isRequiredFilled();
    }

    getDate(date) {
        this.date = date;
        this.isRequiredFilled();
    }

    isRequiredFilled() {
        if (this.date.year > 0 && this.date.month > 0 && this.idPrestadora != null) {
            this.requiredFilled = true;
        } else {
            this.requiredFilled = false;
        }
    }

}
