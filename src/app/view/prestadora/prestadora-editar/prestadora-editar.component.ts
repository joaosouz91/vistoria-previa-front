import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageUtil } from '../../../service/message-util.service';
import { Observable } from 'rxjs';

import { EstadoService } from '../../../service/estado.service';
import { Prestadora } from '../prestadora';
import { PrestadoraVistoriaService } from '../prestadora-module/prestadora-vistoria-service';
import { take } from 'rxjs/operators';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
    selector: 'prestadora-editar',
    templateUrl: './prestadora-editar.component.html'
})
export class PrestadoraEditarComponent implements OnInit {

    prestadora: Prestadora;
    isEdicao: boolean;
    tiposPessoa: SelectItem[] = [{ label: 'Física', value: 'F' }, { label: 'Jurídica', value: 'J' }];
    ufs: SelectItem[];
    dataInicioAtividade: Date = new Date();

    constructor(private prestadoraService: PrestadoraVistoriaService, private router: Router, 
        private activatedRoute: ActivatedRoute, private messageService: MessageUtil, 
        private estadoService: EstadoService) {
        this.prestadora = new Prestadora();
        this.ufs = [];
        this.ufs.push({ value: null });
        this.isEdicao = this.activatedRoute.snapshot.paramMap.has('codigoPrestadora');
    }

    ngOnInit(): void {

        if (this.isEdicao) {
            this.prestadora.codigoPrestadora = +this.activatedRoute.snapshot.paramMap.get('codigoPrestadora');
            this.carregarPrestadora();
        }

        this.estadoService.getEstados().forEach(uf => this.ufs.push({ label: uf.sigla, value: uf.sigla }));
    }

    
    private carregarPrestadora() {
        this.prestadoraService.getPrestadoraVistoria(this.prestadora.codigoPrestadora)
        .pipe(take(1)).subscribe(
            response => {
                this.prestadora = response;
            },
            error => {
                this.messageService.warn('Prestadora não encontrada!');
            }
        );
    }

    salvar() {
        let req: Observable<any>;

        if (this.isEdicao) {
            req = this.prestadoraService.atualizar(this.prestadora.codigoPrestadora, this.prestadora);
        } else {
            req = this.prestadoraService.salvar(this.prestadora);
        }

        req.pipe(take(1)).subscribe(
            response => {
                this.prestadora = response;
                this.messageService.success('Dados salvos com sucesso!');
            },
            error => {
                if (error.status == 400) {
                    this.messageService.error('Dados inválidos!');
                } else {
                    this.messageService.error('Servidor não encontrado!');
                }
            }
        );
    }
}