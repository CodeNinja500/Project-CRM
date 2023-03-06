import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivityModel } from '../models/activity.model';

@Injectable({ providedIn: 'root' })
export class ActivitiesService {
  getAll(): Observable<ActivityModel[]> {
    return of([
      {
        id: '1',
        name: 'Internal Project'
      },
      {
        id: '2',
        name: 'External Project'
      },
      {
        id: '3',
        name: 'Recruitment Agency'
      }
    ]);
  }
}
