import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { UserCredentialsModel } from '../models/user-credentials.model';
import { AuthLoginResponse } from '../responses/auth-login.response';
import { environment } from 'src/environments/environment';
import { RegisterResponse } from '../responses/register.response';
import { UserModel } from '../models/user.model';
import { AuthMeResponse } from '../responses/auth-me.response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _accessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    this._storage.getItem('accessToken')
  );
  public readonly accessToken$: Observable<string | null> = this._accessTokenSubject.asObservable();

  private _refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    this._storage.getItem('refreshToken')
  );
  public readonly refreshToken$: Observable<string | null> = this._refreshTokenSubject.asObservable();

  constructor(private _httpClient: HttpClient, private _storage: Storage) {}

  public login(login: { email: string; password: string }, rememberMe: boolean): Observable<UserCredentialsModel> {
    return this._httpClient
      .post<AuthLoginResponse<UserCredentialsModel>>(`${environment.apiUrl}/auth/login`, {
        data: login
      })
      .pipe(
        map((response) => ({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        })),
        tap((tokens) => this.logInUser(tokens, rememberMe))
      );
  }

  public register(login: { email: string; password: string }): Observable<UserCredentialsModel> {
    return this._httpClient.post<RegisterResponse>(`${environment.apiUrl}/auth/register2`, { data: login }).pipe(
      map((resposne) => ({
        accessToken: resposne.data.user.stsTokenManager.accessToken,
        refreshToken: resposne.data.user.stsTokenManager.refreshToken
      })),
      tap((tokens) => this.logInUser(tokens, false))
    );
  }

  private _me$: Observable<UserModel> = this._httpClient
    .get<AuthMeResponse<UserModel>>(`${environment.apiUrl}/auth/me`)
    .pipe(
      map((response) => ({
        user_id: response.data.user.user_id,
        email: response.data.user.email,
        email_verified: response.data.user.email_verified
      })),
      shareReplay(1)
    );

  public me(): Observable<UserModel> {
    return this._me$;
  }

  private logInUser(tokens: UserCredentialsModel, rememberMe: boolean): void {
    this._accessTokenSubject.next(tokens.accessToken);
    this._refreshTokenSubject.next(tokens.refreshToken);
    if (rememberMe) {
      this._storage.setItem('accessToken', tokens.accessToken);
      this._storage.setItem('refreshToken', tokens.refreshToken);
    }
  }
}
