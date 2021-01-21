import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { take, catchError } from 'rxjs/operators';
import { MessageUtil } from './message-util.service';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = `${environment.baseUrl}/api/users`;

  constructor(private http: HttpClient, private message: MessageUtil) { }

  obterUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}`)
      .pipe(
        catchError(this.message.handleError<Usuario>('obterUsuario')),
        take(1)
      );
  }
}
