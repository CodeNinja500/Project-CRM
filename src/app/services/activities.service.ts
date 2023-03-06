import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ActivityModel } from '../models/activity.model';
import { environment } from 'src/environments/environment';
import { ActivitiesResponse } from '../responses/activities.response';

@Injectable({ providedIn: 'root' })
export class ActivitiesService {
  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<ActivityModel[]> {
    return this._httpClient
      .get<ActivitiesResponse<ActivityModel[]>>(`${environment.apiUrl}/leads/activities`)
      .pipe(map((response) => response.data));
  }
}
