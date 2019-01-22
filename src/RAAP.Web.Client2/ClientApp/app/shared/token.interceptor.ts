import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request);
    }
}