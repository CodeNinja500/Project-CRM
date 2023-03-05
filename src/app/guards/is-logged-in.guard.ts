import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router, private _userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    console.log('is logged in guard activated');
    return this._userService.me().pipe(
      catchError((error: HttpErrorResponse) => of('error')),
      map((response) => {
        return response === 'error' ? this._router.parseUrl(route.data['redirectLoginUrl'] || '/auth/login') : true;
      })
    );
  }
}
