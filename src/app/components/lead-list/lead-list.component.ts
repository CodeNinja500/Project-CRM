import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { LeadModel } from '../../models/lead.model';
import { LeadsService } from '../../services/leads.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadListComponent {
  readonly leadList$: Observable<LeadModel[]> = this._leadsService.getAll();
  readonly isAdmin$: Observable<boolean> = this._userService.isAdmin();

  constructor(private _leadsService: LeadsService, private _userService: UserService) {}
}
