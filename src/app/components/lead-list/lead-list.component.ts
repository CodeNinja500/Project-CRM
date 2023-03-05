import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { LeadModel } from '../../models/lead.model';
import { LeadsService } from '../../services/leads.service';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadListComponent {
  readonly leadList$: Observable<LeadModel[]> = this._leadsService.getAll();

  constructor(private _leadsService: LeadsService) {}
}
