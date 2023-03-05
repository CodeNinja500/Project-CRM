import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LeadsService } from '../../services/leads.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsComponent {
  private _isUserMenuVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUserMenuVisible$: Observable<boolean> = this._isUserMenuVisibleSubject.asObservable();

  readonly leadList$: Observable<void> = this._leadsService.getAll();

  constructor(private _authService: AuthService, private _router: Router, private _leadsService: LeadsService) {}

  public toggleUserMenu(): void {
    this.isUserMenuVisible$
      .pipe(
        take(1),
        tap((isVisible) => this._isUserMenuVisibleSubject.next(!isVisible))
      )
      .subscribe();
  }

  public signUserOut(): void {
    this._authService.logOutUser();
    this._router.navigate(['/logged-out']);
  }
}
