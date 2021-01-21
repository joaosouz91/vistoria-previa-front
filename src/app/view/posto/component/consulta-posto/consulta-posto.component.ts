import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Posto } from '../../model/posto';
import { PostoService } from '../../posto-module/posto.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-consulta-posto',
  templateUrl: './consulta-posto.component.html',
  styleUrls: ['./consulta-posto.component.css']
})
export class ConsultaPostoComponent implements OnInit {

  constructor(private postoService: PostoService) { }

  @Output() onSelect: EventEmitter<Posto> = new EventEmitter();
  @Input() isCaminhao: boolean = false;
  @Input() idVistoria: number;
  @Input() idRegiao: string;

  bairro: string;
  posto: Posto;

  cidades: SelectItem[];
  bairros: SelectItem[];
  postos: Posto[];

  ngOnInit() {
      this.carregarBairros();
  }

  carregarBairros() {
    this.bairro = null;
    this.bairros = [];
    this.postos = null;
    this.setPosto(new Posto());

    if (this.idRegiao) {
      this.bairros.push({ value: null, label: 'Todos' });
      this.postoService.getBairrosPorRegiao(this.idRegiao, this.isCaminhao)
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

  buscarPostos() {
    this.postos = [];
    this.setPosto(new Posto());

    this.postoService.getPostosPorLocal(this.idVistoria, this.idRegiao, this.bairro, this.isCaminhao)
    .pipe(take(1)).subscribe(resp => this.postos = resp);
  }

  setPosto(p: Posto) {
    this.posto = p;
    this.onSelect.emit(p);
  }
}
