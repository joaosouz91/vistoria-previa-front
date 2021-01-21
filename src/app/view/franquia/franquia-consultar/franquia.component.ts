import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageUtil } from '../../../service/message-util.service';

import { FiltroFranquia } from '../franquia-response/filtro-franquia';
import { Franquia } from '../model/Franquia';
import { FranquiaService } from '../franquia-module/franquia.service';
import { take } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-franquia',
  templateUrl: './franquia.component.html'
})
export class FranquiaComponent implements OnInit {

    count = 0;
    totalRegistros = 0;
    filtro: FiltroFranquia;
    result: Franquia[] = [];
    displayDialog: boolean;
    franquia: Franquia;
    loading: boolean;

  constructor(private franquiaService: FranquiaService, private messageService: MessageUtil, private router: Router) { 
    this.franquia = new Franquia();
    this.filtro = new FiltroFranquia;
    this.filtro.itensPorPagina = 10;
    this.loading = true;
  }

  ngOnInit() {
  }

  pesquisarFranquia(pagina = 0) {

    this.filtro.pagina = pagina;
    

    this.franquiaService.pesquisaFranquia(this.filtro)
    .pipe(take(1))
    .subscribe(
        response => {
            this.loading = true;
            this.result = response.franquia;
            this.totalRegistros = response.total;
            this.loading = false;
        },
        error => {
            if (error.status == 400) {
                this.messageService.error('Preencher filtro corretamente!');
            } else if (error.status > 400) {
                this.messageService.error('Servidor não encontrado!');
            } else {
                this.messageService.warn('Dados não encontrados!');
                this.result = [];
            }
        }
    );



}

    loadFranquiasLazy(event: LazyLoadEvent) {
        this.loading = true;
        this.pesquisarFranquia(event.first / event.rows);
        

 
    }



    visualizarFranquia(franquia: Franquia) {
        
        this.router.navigate(['/franquia/' + franquia.codigo]);
    }

    selectFranquia(event: Event, fran: Franquia) {
        this.franquia = fran
        this.displayDialog = true;
        event.preventDefault();
    }



    }
