import { OnInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageUtil } from '../../../service/message-util.service';
import { Observable } from 'rxjs';

import { Franquia } from '../model/Franquia';
import { FranquiaService } from '../franquia-module/franquia.service';
import { EstadoService } from '../../../service/estado.service';
import { PrestadoraVistoriaService } from '../../prestadora/prestadora-module/prestadora-vistoria-service';
import { take } from 'rxjs/operators';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
    selector: 'franquia-editar',
    templateUrl: './franquia-editar.component.html'
})

export class FranquiaEditarComponent implements OnInit {

    franquia: Franquia = new Franquia();
    isEdicao: boolean;
    tiposPessoa: SelectItem[] = [{ label: 'Física', value: 'F' }, { label: 'Jurídica', value: 'J' }];
    ufs: SelectItem[];
    prestadoras: SelectItem[];
    dataInicioAtividade: Date = new Date();
    numero: string;
    codigo: string;

    /*   Constructor */
    constructor(private franquiaService: FranquiaService, private prestadoraService: PrestadoraVistoriaService, private activatedRoute: ActivatedRoute, private messageService: MessageUtil, private estadoService: EstadoService) {
        this.ufs = [];
        this.ufs.push({ value: null });
        this.isEdicao = this.activatedRoute.snapshot.paramMap.has('codigoFranquia');
    }

    ngOnInit(): void {

        if (this.isEdicao) {
            this.franquia.codigo = this.activatedRoute.snapshot.paramMap.get('codigoFranquia');
            this.carregarFranquia();
        }

        this.carregaPrestadoras();
        this.carregaEstados();
    }

    private carregaPrestadoras() {
        let lista = [];
        this.prestadoraService.getAllVistoriaPrevia().pipe(take(1)).subscribe(
            resp => {
                resp.forEach(l => {
                    lista.push({ label: l.nmRazaoSocal, value: l.cdAgrmtVspre })
                    this.prestadoras = lista
                })
            },
        );
    }

    private carregaEstados() {
        this.estadoService.getEstados().forEach(uf => this.ufs.push({ label: uf.sigla, value: uf.sigla }));
    }

    private carregarFranquia() {
        this.franquiaService.getFranquia(this.franquia.codigo).pipe(take(1)).subscribe(
            response => {
                this.franquia = response;
            },
            error => {
                this.messageService.warn('Franquia não encontrada!');
            }
        );

    }

    salvar() {
        let req: Observable<any>;

        if (this.isEdicao) {
            req = this.franquiaService.atualizar(this.franquia.codigo, this.franquia);
        } else {
            req = this.franquiaService.salvar(this.franquia);
        }

        req.pipe(take(1)).subscribe(
            response => {
                this.franquia = response;
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