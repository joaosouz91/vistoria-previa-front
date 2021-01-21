import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Posto } from '../model/posto';
import { Pagination } from '../model/pagination';
import { PostoService } from '../posto-module/posto.service';
import { EstadoService } from '../../../service/estado.service';
import { take } from 'rxjs/operators';
import { SelectItem } from 'primeng/api/selectitem';
import { MessageUtil } from '../../../service/message-util.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'posto',
  templateUrl: './posto.component.html'
})
export class PostoComponent implements OnInit {

  filtro: Posto;
  pagination: Pagination = { page: 0, size: 10 };
  codigoPrestadora: string;
  ufs: SelectItem[];
  cidades: SelectItem[];
  bairros: SelectItem[];
  totalRegistros = 0;
  postos: Posto[] = [];
  fromListagem: Boolean;
  exibirDialog = false;
  posto: Posto;

  constructor(private route: ActivatedRoute, private estadoService: EstadoService, private messageService: MessageUtil,
    private postoService: PostoService, private router: Router) {
    this.ufs = [];
    this.ufs.push({ value: null });
    this.fromListagem = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.listagem : false;
  }

  ngOnInit() {
    this.filtro = new Posto();

    if (this.route.snapshot.paramMap.has("codigoPrestadora")) {
      this.codigoPrestadora = this.route.snapshot.paramMap.get("codigoPrestadora");
      this.filtro.codigoPrestadora = +this.codigoPrestadora;
    } else {
      this.filtro.ativo = true;
    }
    
    this.estadoService.getEstados().forEach(uf => this.ufs.push({ label: uf.sigla, value: uf.sigla }));
  }

  pesquisar() {
    this.postoService.pesquisar(this.filtro, this.pagination).pipe(take(1)).subscribe(
      response => {
        this.postos = response.postos;
        this.totalRegistros = response.total;
      },
      error => {
        if (error.status == 400) {
          this.messageService.error('Preencher filtro corretamente!');
        } else if (error.status > 400) {
          this.messageService.error('Servidor não encontrado!');
        } else {
          this.messageService.warn('Dados não encontrados!');
          this.postos = [];
        }
      }
    );
  }

  carregarCidades() {
    this.cidades = [];
    this.cidades.push({ value: null });
    this.obterCidades().subscribe(resp => {
      if (resp.status === 204) {
        if (this.codigoPrestadora) {
          this.messageService.warn(`Prestadora não possui postos neste estado.`);
        } else {
          this.messageService.warn(`Não há postos neste estado.`);
        }
      } else {
        resp.body.forEach(element => {
          this.cidades.push({ label: element, value: element });
        });
      }
    }, error => {
      this.messageService.error(`Ocorreu um erro ao consultar cidades.`);
    });
  }

  carregarBairros() {
    this.bairros = [];
    if (this.filtro.uf && this.filtro.cidade) {
      this.bairros.push({ value: null, label: 'Todos' });
      this.postoService.getBairrosPorUfCidade(this.filtro.uf, this.filtro.cidade)
      .pipe(take(1))
      .subscribe(resp => {
        if (resp) {
          resp.forEach(element => {
            this.bairros.push({ label: element, value: element });
          });
        }
      });
    }
  }

  private obterCidades() {
    if (this.codigoPrestadora) {
      return this.postoService.getCidadesPorPrestadoraEstado(this.codigoPrestadora, this.filtro.uf)
        .pipe(take(1));
    } else {
      return this.postoService.getCidadesPorEstado(this.filtro.uf)
        .pipe(take(1));
    }
  }

  loadPostosLazy(event: LazyLoadEvent) {
    this.pagination.page = event.first / event.rows;
    this.pesquisar();
  }

  voltar() {
    if (this.fromListagem) {
      this.router.navigate(['/prestadora']);
    } else {
      this.router.navigate([`/prestadora/${this.codigoPrestadora}`]);
    }
  }

  fechar() {
    this.exibirDialog = false;
    this.posto = null;
  }
  
  exibirPosto(posto: Posto) {
    this.posto = posto;
    this.exibirDialog = true;
  }
}