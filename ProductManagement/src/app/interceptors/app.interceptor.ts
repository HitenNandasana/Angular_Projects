import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../appServices/auth/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(public authservice: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.authservice.getToken()
    if (!token) {
      return next.handle(request);
    }
    const req = request.clone({
      setHeaders: {
        "Authorization": 'Bearer ' + localStorage.getItem('Token')
      }
    });
    return next.handle(req);
  }
}
