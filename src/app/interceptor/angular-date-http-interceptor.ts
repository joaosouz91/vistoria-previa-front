import { Injectable, NgModule } from '@angular/core';
import { HttpRequest, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { tap } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable()
export class AngularDateHttpInterceptor implements HttpInterceptor {
    iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d\d\d)|Z)?$/;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const body = event.body;
                    this.convertToDate(body);
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                    }
                }
            })
        );
    }

    convertToDate(body) {
        if (body === null || body === undefined) {
            return body;
        }

        if (typeof body !== 'object') {
            return body;
        }

        for (const key of Object.keys(body)) {
            const value = body[key];
            if (this.isIso8601(value)) {
                body[key] = new Date(value);
            } else if (typeof value === 'object') {
                this.convertToDate(value);
            }
        }
    }

    isIso8601(value) {
        if (value === null || value === undefined) {
            return false;
        }
        return this.iso8601.test(value);
    }
}
@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AngularDateHttpInterceptor,
            multi: true,
        },
    ],
})


export class DateHttpInterceptor { }