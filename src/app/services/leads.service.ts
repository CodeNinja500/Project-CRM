import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LeadsResponse } from '../responses/leads.response';
import { LeadModel } from '../models/lead.model';

@Injectable({ providedIn: 'root' })
export class LeadsService {
  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<LeadModel[]> {
    return this._httpClient
      .get<LeadsResponse<LeadModel>>(`${environment.apiUrl}/leads`)
      .pipe(map((response) => response.data.map((data) => data.data)));
  }
}
