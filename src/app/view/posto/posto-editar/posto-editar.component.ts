import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Posto } from '../model/posto';
import { PostoService } from '../posto-module/posto.service';
import { EstadoService } from '../../../service/estado.service';
import { take } from 'rxjs/operators';
import { SelectItem } from 'primeng/api/selectitem';
import { MessageUtil } from '../../../service/message-util.service';

@Component({
  selector: 'app-posto-editar',
  templateUrl: './posto-editar.component.html'
})
export class PostoEditarComponent implements OnInit {

  posto: Posto;
  ufs: SelectItem[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private postoService: PostoService, private messageService: MessageUtil,
    private estadoService: EstadoService) {
    this.posto = new Posto();
    this.posto.codigoPrestadora = +this.activatedRoute.snapshot.paramMap.get('codigoPrestadora');
    this.posto.codigoPosto = +this.activatedRoute.snapshot.paramMap.get('codigoPosto');
    this.ufs = [];
    this.ufs.push({ value: null });
  }

  ngOnInit() {
    this.carregarPosto();
    this.estadoService.getEstados().forEach(uf => this.ufs.push({ label: uf.sigla, value: uf.sigla }));
  }

  private carregarPosto() {
    this.postoService.getPrestadoraVistoria(this.posto.codigoPosto, this.posto.codigoPrestadora)
      .pipe(take(1)).subscribe(
        response => {
          this.posto = response;
        },
        error => {
          this.messageService.warn('Posto não encontrado!');
          this.voltarPagina();
        }
      );
  }

  voltarPagina() {
    this.router.navigate([`/posto/prestadora/${this.posto.codigoPrestadora}`]);
  }

  salvar() {
    this.postoService.atualizar(this.posto)
      .pipe(take(1)).subscribe(
        response => {
          this.posto = response;
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
