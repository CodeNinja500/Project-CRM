import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private _httpClient: HttpClient) {}

  register(login: { email: string; password: string }): Observable<void> {
    return this._httpClient.post<void>(`${environment.apiUrl}/auth/register2`, { data: login });
  }
}
