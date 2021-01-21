import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Parecer } from '../view/laudo-vistoria/model/parecer';
import { environment } from '../../environments/environment';
import { take } from 'rxjs/operators';

@Injectable()
export class ComboService{

    baseUrl = `${environment.baseUrl}/v1/combos`;

    constructor(private http:HttpClient){
    }

    listaEstadoCivil():Observable<any>{
        return this.http.get<any>(this.baseUrl+"/estado-civil").pipe(take(1));
    }
    
    listaStatusLaudo():Observable<any>{
        return this.http.get<any>(this.baseUrl+"/tipo-status-laudo").pipe(take(1));
    }

    listaTipoCombustivel():Observable<any>{
        return this.http.get<any>(this.baseUrl+"/tipo-combustivel").pipe(take(1));
    }

    listaTipoCondutor():Observable<any>{
        return this.http.get<any>(this.baseUrl+"/tipo-condutor").pipe(take(1));
    }

    listaTipoSeguro():Observable<any>{
        return this.http.get<any>(this.baseUrl+"/tipo-seguro").pipe(take(1));
    }

    listaTipoFrustracao():Observable<any>{
        return this.http.get<any>(this.baseUrl+"/tipo-frustracao").pipe(take(1));
    }

    listaTipoMaterialCarroceria():Observable<any>{
        return this.http.get<any>(this.baseUrl+"/tipo-material-carroceria").pipe(take(1));
    }

    listaTipoCabine():Observable<any>{
        return this.http.get<any>(this.baseUrl+"/tipo-cabine").pipe(take(1));
    }

    listaTipoGaragem():Observable<any>{
        return this.http.get<any>(this.baseUrl+"/tipo-garagem").pipe(take(1));
    }

    listaVeiculoUtilizacao():Observable<any>{
        return this.http.get<any>(this.baseUrl+"/tipo-veiculo-utilizacao").pipe(take(1));
    }

    listaParecerTecnico():Observable<Parecer>{
        return this.http.get<Parecer>(this.baseUrl+"/parecer-tecnico").pipe(take(1));
    }

    listaFabricantes():Observable<any>{
        return this.http.get<any>(this.baseUrl+"/fabricantes").pipe(take(1));
    }

    obterFabricante(cod: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/fabricantes/${cod}`).pipe(take(1));
    }

    listaModelos(fabricante:number):Observable<any>{
        return this.http.get<any>(this.baseUrl+"/fabricantes/"+fabricante+"/modelos").pipe(take(1));
    }

    obterModelo(fabricante:number, modelo:number):Observable<any>{
        return this.http.get<any>(`${this.baseUrl}/fabricantes/${fabricante}/modelos/${modelo}`).pipe(take(1));
    }
    
}