import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private _storage: Storage) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const refreshToken = this._storage.getItem('refreshToken');
        if (error.status === 403 && error.error.message === 'Token is invalid' && refreshToken) {
          return this._authService.refreshToken(refreshToken).pipe(
            switchMap((credentials) => {
              const newRequest = request.clone({ setHeaders: { Authorization: `Bearer ${credentials.accessToken}` } });
              return next.handle(newRequest);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
