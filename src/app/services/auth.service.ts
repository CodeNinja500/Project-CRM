import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserCredentialsModel } from '../models/user-credentials.model';
import { AuthLoginResponse } from '../responses/auth-login.response';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly accessToken$: Observable<string> = this._accessTokenSubject.asObservable();

  private _refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly refreshToken$: Observable<string> = this._refreshTokenSubject.asObservable();

  constructor(private _httpClient: HttpClient) {}

  public login(login: { email: string; password: string }): Observable<UserCredentialsModel> {
    return this._httpClient
      .post<AuthLoginResponse<UserCredentialsModel>>(`${environment.apiUrl}/auth/login`, {
        data: login
      })
      .pipe(
        map((response) => ({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        })),
        tap((tokens) => this.logInUser(tokens))
      );
  }

  private logInUser(tokens: UserCredentialsModel): void {
    this._accessTokenSubject.next(tokens.accessToken);
    this._refreshTokenSubject.next(tokens.refreshToken);
  }
}
