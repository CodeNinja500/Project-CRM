import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeadModel } from '../models/lead.model';
import { LeadsResponse } from '../responses/leads.response';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LeadsService {
  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<LeadModel[]> {
    return this._httpClient
      .get<LeadsResponse<LeadModel>>(`${environment.apiUrl}/leads`)
      .pipe(map((response) => response.data.map((data) => data)));
  }

  create(lead: LeadModel): Observable<void> {
    return this._httpClient.post<void>(`${environment.apiUrl}/leads`, { data: lead });
  }
}
