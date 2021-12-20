import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const accessToken = this.authService.accessToken;

    let request = req;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Accept-Language': 'es',
    });

    if (accessToken) {
      request = req.clone({ headers });
    }

    return next.handle(request);
  }
}
