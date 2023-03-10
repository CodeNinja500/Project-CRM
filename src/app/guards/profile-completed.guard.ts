import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, take, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileCompletedGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this._userService.checkUserBio().pipe(
      take(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of('notCompleted');
        }
        return throwError(() => error);
      }),
      map((response) =>
        response === 'notCompleted'
          ? this._router.parseUrl(route.data['redirectCompleteProfileUrl'] || '/complete-profile')
          : true
      )
    );
  }
}
