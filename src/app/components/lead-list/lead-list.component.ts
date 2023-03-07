import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { LeadModel } from '../../models/lead.model';
import { ActivityModel } from '../../models/activity.model';
import { LeadsService } from '../../services/leads.service';
import { UserService } from '../../services/user.service';
import { ActivitiesService } from '../../services/activities.service';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadListComponent {
  readonly leadList$: Observable<LeadModel[]> = this._leadsService
    .getAll()
    .pipe(
      switchMap((leadList) =>
        this._activitiesService.getAll().pipe(map((activityList) => this.mapLeadListActivities(leadList, activityList)))
      )
    );

  readonly isAdmin$: Observable<boolean> = this._userService.isAdmin();

  readonly activityList$: Observable<ActivityModel[]> = this._activitiesService.getAll();

  constructor(
    private _leadsService: LeadsService,
    private _userService: UserService,
    private _activitiesService: ActivitiesService
  ) {}

  private mapLeadListActivities(leadList: LeadModel[], activites: ActivityModel[]): LeadModel[] {
    const activitiesMap = activites.reduce((a, c) => ({ ...a, [c.id]: c.name }), {} as Record<string, string>);

    return leadList.map((lead) => ({
      name: lead.name,
      websiteLink: lead.websiteLink,
      annualRevenue: lead.annualRevenue,
      companySize: lead.companySize,
      hiring: lead.hiring,
      industry: lead.industry,
      linkedinLink: lead.linkedinLink,
      location: lead.location,
      activityIds: lead.activityIds.map((activityId) => activitiesMap[activityId])
    }));
  }
}
