import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { decryptPassword, encryptPassword } from 'src/app/shared/Utils';
import { AuthService } from '../service/auth.service';

/**
 * Intercepts requests for add headers
 * @class
 */
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

    if (req.body?.password) {
      req.body.password = encryptPassword(req.body.password);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Accept-Language': 'es',
    });

    if (accessToken) {
      request = req.clone({ headers });
    }

    return next.handle(request).pipe(
      map((req) => {
        if (req instanceof HttpResponse && req.body?.password) {
          req.body.password = decryptPassword(req.body.password);
        }
        return req;
      }),
    );
  }
}
