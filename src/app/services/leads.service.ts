import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeadModel } from '../models/lead.model';
import { LeadsResponse } from '../responses/leads.response';
import { LeadSizeModel } from '../models/lead-size.model';
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

  getLeadSizeList(): Observable<LeadSizeModel[]> {
    return of([
      {
        rangeId: '1',
        from: 0,
        to: 50
      },
      {
        rangeId: '2',
        from: 51,
        to: 100
      },
      {
        rangeId: '3',
        from: 101,
        to: 500
      },
      {
        rangeId: '4',
        from: 501,
        to: 1000
      },
      {
        rangeId: '5',
        from: 1001,
        to: null
      }
    ]);
  }
}
