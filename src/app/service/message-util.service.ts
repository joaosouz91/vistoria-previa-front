import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageUtil {

  constructor(private messageService: MessageService) {
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      if (error.status == 0) {
        this.error('Servidor não encontrado!');
      } else if (error.status == 400) {
        this.errorInline('Preencher filtro corretamente!');
      } else if (error.status == 401) {
        this.error('Usuário não autorizado!');
      } else if (error.status >= 401 && error.status < 500) {
        this.warnInline(error.error.message);
        // this.warn(error.error.message);
      } else if (error.status == 503) {
        this.errorInline(error.error.message);
      } else if (error.status >= 500) {
        this.error('Ocorreu um erro interno no servidor');
      }

      return throwError(error);
    };
  }

  error(msg: string) {
    this.messageService.add({ 
      key: 'no-c', 
      severity: 'error', 
      summary: 'Erro', 
      detail: msg, 
      life: 5000,
      data: { 
        classI: 'pi-times', 
        classBtn: 'ui-button-danger' 
      } 
    });
  }
  
  warn(msg: string) {
    this.messageService.add({
      key: 'no-c', 
      severity: 'warn', 
      summary: 'Aviso', 
      detail: msg, 
      life: 5000,
      data: { 
        classI: 'pi-exclamation-triangle', 
        classBtn: 'ui-button-warning' 
      } 
    });
  }

  success(msg: string) {
    this.messageService.add({ 
      key: 'no-c', 
      severity: 'success', 
      summary: 'Sucesso', 
      detail: msg,
      life: 5000,
      data: { 
        classI: 'pi-check', 
        classBtn: 'ui-button-success' 
      } 
    });
  }

  errorInline(msg: string, miliseconds = 20000) {
    this.messageService.clear();
    this.messageService.add({ 
      key: 'inline',
      severity: 'error', 
      summary: 'Erro', 
      detail: msg
    });

    if (miliseconds && miliseconds > 0) {
      setTimeout(() => this.messageService.clear(), miliseconds);
    }
  }
  
  warnInline(msg: string, miliseconds = 20000) {
    this.messageService.clear();
    this.messageService.add({ 
      key: 'inline',
      severity: 'warn', 
      summary: 'Aviso', 
      detail: msg
    });

    if (miliseconds) {
      setTimeout(() => this.messageService.clear(), miliseconds);
    }
  }
  
  successInline(msg: string, miliseconds = 20000) {
    this.messageService.clear();
    this.messageService.add({ 
      key: 'inline',
      severity: 'success', 
      summary: 'Sucesso', 
      detail: msg
    });

    if (miliseconds) {
      setTimeout(() => this.messageService.clear(), miliseconds);
    }
  }
}