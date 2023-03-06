import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatusService {
  getAll(): Observable<string[]> {
    return of(['Preliminaries', 'Investigation', 'Demonstrating Capabilities', 'Obtaining Commitment']);
  }
}
