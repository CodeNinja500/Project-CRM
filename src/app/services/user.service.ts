import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AuthMeResponse } from '../responses/auth-me.response';
import { environment } from 'src/environments/environment';

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

  public postUserBio(bio: string): Observable<void> {
    return this._httpClient.post<void>(`${environment.apiUrl}/auth/add-bio`, { data: { content: bio } });
  }

  public checkUserBio(): Observable<void> {
    return this._httpClient.get<void>(`${environment.apiUrl}/auth/my-bio`);
  }

  public isAdmin(): Observable<boolean> {
    return this._me$.pipe(map((response) => (response.role === 'admin' ? true : false)));
  }
}
