import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    console.log('is logged in guard activated');
    return this._authService.accessToken$.pipe(
      map((accessToken) => {
        console.log(accessToken ? true : false);
        return accessToken ? true : this._router.parseUrl(route.data['redirectLoginUrl'] || '/auth/login');
      })
    );
  }
}
