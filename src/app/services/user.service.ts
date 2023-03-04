import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';
import { AuthMeResponse } from '../responses/auth-me.response';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private _httpClient: HttpClient) {}

  private _me$: Observable<UserModel> = this._httpClient
    .get<AuthMeResponse<UserModel>>(`${environment.apiUrl}/auth/me`)
    .pipe(
      map((response) => response.data.user.context),
      shareReplay(1)
    );

  public me(): Observable<UserModel> {
    return this._me$;
  }
}
