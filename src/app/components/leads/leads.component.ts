import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsComponent {
  readonly userDetails$: Observable<UserModel> = this._userService.me().pipe(take(1));
  readonly isUserMenuVisible$: Observable<boolean> = this._uiStateService.isUserMenuVisible$;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userService: UserService,
    private _uiStateService: UiStateService
  ) {}

  public toggleUserMenu(): void {
    this._uiStateService.toggleUserMenu();
  }

  public signUserOut(): void {
    this._authService.logOutUser();
    this._router.navigate(['/logged-out']);
  }
}
