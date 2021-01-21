import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SelectItem } from 'primeng/api';

import { CorretorService } from '../../../../service/corretor-service';
import { RelatorioService } from '../../../../service/relatorio-service';
import { RelatorioImprodutividade } from '../../../../model/relatorio/relatorio-improdutividade';

@Component({
  selector: 'app-relatorio-improdutivo-consultar',
  templateUrl: './relatorio-improdutivo-consultar.component.html',
  styleUrls: ['./relatorio-improdutivo-consultar.component.css']
})
export class RelatorioImprodutivoConsultarComponent implements OnInit {

  constructor(
    private corretorService: CorretorService,
    private fb: FormBuilder,
    private relatorioService: RelatorioService
  ) { }

  relatorio: RelatorioImprodutividade;
  formPesquisa: FormGroup;
  visoes$: Observable<SelectItem[]>;
  datasReferencia$: Observable<SelectItem[]>;
  superintendencias$: Observable<SelectItem[]>;
  sucursais$: Observable<SelectItem[]>;
  pareceresTecnicos: SelectItem[] = [
    { value: null },
    { value: 'A', label: 'Aceitável' },
    { value: 'S', label: 'Sujeito a análise' },
    { value: 'R', label: 'Recusável' }
  ];

  superintendencias: SelectItem[];
  sucursais: SelectItem[];

  formPesquisaCorretor: FormGroup;
  dialogConsultaCorretor = false;
  corretores = [];

  ngOnInit(): void {
    this.buildFormPesquisa();
    this.buildFormPesquisaCorretor();
    this.visoes$ = this.relatorioService.getVisoesRelatorioImprodutivo();
    this.superintendencias$ = this.relatorioService.getSuperintendenciasRelatorioImprodutivo().pipe(tap(resp => this.superintendencias = resp));
    this.sucursais$ = this.relatorioService.getSucursaisRelatorioImprodutivo().pipe(tap(resp => this.sucursais = resp));
    this.datasReferencia$ = this.relatorioService.getDatasRelatorioImprodutivo();

    let filtroRelatorio = history.state.filtroRelatorio;
    if (filtroRelatorio) {
      this.formPesquisa.patchValue(filtroRelatorio);
      this.onSubmit();
    }
  }

  buildFormPesquisa(): void {
    this.formPesquisa = this.fb.group({
      visao: [null, Validators.required],
      dataReferencia: [null, Validators.required],
      superintendencia: [null],
      sucursal: [null],
      corretor: [null],
      laudo: [null],
      dataVistoria: [null],
      voucher: [null],
      parecereTecnico: [null],
      placa: [null],
      chassi: [null],
    });

    this.formPesquisa.controls.visao.valueChanges.subscribe(() => {
      this.formPesquisa.patchValue({
        superintendencia: null,
        sucursal: null,
        corretor: null,
        laudo: null,
        dataVistoria: null,
        voucher: null,
        parecereTecnico: null,
        placa: null,
        chassi: null
      });

      if (this.superintendencias) {
        this.superintendencias$ = of(this.superintendencias);
      }

      if (this.sucursais) {
        this.sucursais$ = of(this.sucursais);
      }
    });
  }

  onSubmit(): void {
    this.relatorioService.getRelatorioImprodutivo(this.formPesquisa.value).subscribe(
      resp => this.relatorio = resp
    );
  }

  buildFormPesquisaCorretor(): void {
    this.formPesquisaCorretor = this.fb.group({
      tipo: [null, Validators.required],
      valor: [null, Validators.required]
    });
  }

  abrirDialogConsultaCorretor(): void {
    this.dialogConsultaCorretor = true;
  }

  fecharDialogConsultaCorretor(): void {
    this.dialogConsultaCorretor = false;
    this.corretores = [];
    this.formPesquisaCorretor.reset();
  }

  pesquisarCorretor(): void {
    this.corretorService
      .pesquisarCorretor(this.formPesquisaCorretor.value.tipo, this.formPesquisaCorretor.value.valor)
      .subscribe(resp => this.corretores = resp);
  }
}
