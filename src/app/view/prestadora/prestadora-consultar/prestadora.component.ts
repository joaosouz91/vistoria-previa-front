import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageUtil } from '../../../service/message-util.service';
import { FiltroPrestadora } from '../filtro-prestadora';
import { Prestadora } from '../prestadora';
import { PrestadoraVistoriaService } from '../prestadora-module/prestadora-vistoria-service';
import { take } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';

@Component({
    selector: 'prestadora',
    templateUrl: './prestadora.component.html'
})
export class PrestadoraComponent implements OnInit {

    totalRegistros = 0;
    filtro: FiltroPrestadora;
    prestadoras: Prestadora[] = [];
    loading: boolean;

    constructor(private prestadoraService: PrestadoraVistoriaService, private messageService: MessageUtil, private router: Router) {
        this.filtro = new FiltroPrestadora;
        this.filtro.itensPorPagina = 10;
    }

    ngOnInit() { }


    pesquisarPrestadora(pagina = 0) {
        this.filtro.pagina = pagina;
        
        this.prestadoraService.pesquisaPrestadora(this.filtro).pipe(take(1)).subscribe(
            response => {
                this.loading = true;
                this.prestadoras = response.prestadoras;
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
                    this.prestadoras = [];
                }
            }
        );
    }

    loadPrestadorasLazy(event: LazyLoadEvent) {
        this.loading = true;
        this.pesquisarPrestadora(event.first / event.rows);
    }

    visualizarPrestadora(prestadora: Prestadora) {
        this.router.navigate(['/prestadora/' + prestadora.codigoPrestadora]);
    }
}