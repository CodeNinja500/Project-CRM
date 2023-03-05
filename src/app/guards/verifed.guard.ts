import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifedGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    console.log('verify guard activated');
    return this._userService.me().pipe(
      take(1),
      map((response) => {
        console.log(response.email_verified);
        return response.email_verified === true
          ? true
          : this._router.parseUrl(route.data['redirectVerifyUrl'] || '/verify');
      })
    );
  }
}
