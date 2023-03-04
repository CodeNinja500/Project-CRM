import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, switchMap, timeout } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private _authSerive: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const blackList = ['auth/login'];
    if (blackList.find((blackUrl) => request.url.includes(blackUrl))) {
      return next.handle(request);
    } else {
      return this._authSerive.accessToken$.pipe(
        switchMap((accessToken) => {
          const newRequest = request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
          return next.handle(newRequest);
        }),
        timeout(5000)
      );
    }
  }
}
