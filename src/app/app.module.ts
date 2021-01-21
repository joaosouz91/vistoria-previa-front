import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DateHttpInterceptor } from './interceptor/angular-date-http-interceptor';
import { LayoutModule } from './view/layout.module';
import { BtnListarPostosModule } from './view/posto/btn-listar-postos/btn-listar-postos.component';
import { BlockUIModule } from 'primeng/blockui';
import { LoaderService } from './service/loader.service';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ToastModule } from 'primeng/toast';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DateHttpInterceptor,
    LayoutModule,
    BlockUIModule,
    BtnListarPostosModule,
    ToastModule,
    ButtonModule,
    ProgressBarModule
  ],
  providers: [
    LoaderService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }