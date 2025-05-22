import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     if (req.url.includes('/login') || req.url.includes('/register')) {
      return next.handle(req);
    }

    const token = this.getTokenFromCookies();


  
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq);
   
  }

  private getTokenFromCookies(): string | null {
    const match = document.cookie.match(/(^|;\s*)token=([^;]+)/);
    return match ? match[2] : null;
  }
}
