import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiStateService {
  private _isFilterModalVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isFilterModalVisible$: Observable<boolean> = this._isFilterModalVisibleSubject.asObservable();

  private _isUserMenuVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isUserMenuVisible$: Observable<boolean> = this._isUserMenuVisibleSubject.asObservable();

  public toggleUserMenu(): void {
    this.isUserMenuVisible$
      .pipe(
        take(1),
        tap((isVisible) => this._isUserMenuVisibleSubject.next(!isVisible))
      )
      .subscribe();
  }

  public showFilterModal(): void {
    this._isFilterModalVisibleSubject.next(true);
  }

  public hideFilterModal(): void {
    this._isFilterModalVisibleSubject.next(false);
  }
}
