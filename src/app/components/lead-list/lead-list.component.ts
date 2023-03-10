import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';
import { ActivityModel } from '../../models/activity.model';
import { LeadModel } from '../../models/lead.model';
import { LeadSizeModel } from '../../models/lead-size.model';
import { LeadsService } from '../../services/leads.service';
import { UserService } from '../../services/user.service';
import { ActivitiesService } from '../../services/activities.service';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadListComponent {
  readonly activityList$: Observable<ActivityModel[]> = this._activitiesService.getAll().pipe(
    take(1),
    tap((data) => this.onActivityListAddControls(data)),
    shareReplay(1)
  );

  readonly scopeForm: FormGroup = new FormGroup({});
  readonly sizeForm: FormGroup = new FormGroup({});
  readonly filterForm: FormGroup = new FormGroup({ scope: this.scopeForm, size: this.sizeForm });

  readonly leadSizeList$: Observable<LeadSizeModel[]> = this._leadsService.getLeadSizeList().pipe(
    tap((data) => this.onLeadSizeListAddControls(data)),
    shareReplay(1)
  );

  readonly selectedScopes$: Observable<string[]> = this.scopeForm.valueChanges.pipe(
    startWith([]),
    map((scopes) =>
      Object.keys(scopes).reduce((a: string[], c) => {
        if (scopes[c]) {
          return [...a, c];
        } else {
          return a;
        }
      }, [])
    )
  );

  readonly selectedSizeIds$: Observable<string[]> = this.sizeForm.valueChanges.pipe(startWith([])).pipe(
    map((sizeIds) =>
      Object.keys(sizeIds).reduce((a: string[], c) => {
        if (sizeIds[c]) {
          return [...a, c];
        } else {
          return a;
        }
      }, [])
    )
  );

  readonly selectedSizesList$: Observable<LeadSizeModel[]> = combineLatest([
    this.selectedSizeIds$,
    this.leadSizeList$
  ]).pipe(map(([sizeIds, leadSizes]) => this.mapSizeIdsToSizeModelList(leadSizes, sizeIds)));

  readonly leadListFiltered$: Observable<LeadModel[]> = combineLatest([
    this._leadsService.getAll().pipe(take(1)),
    this.selectedScopes$,
    this.selectedSizesList$
  ]).pipe(
    map(([leadList, scopes, sizes]) => {
      return leadList
        .filter((lead) => {
          let setOfIds = new Set(lead.activityIds);
          return scopes.every((scope) => setOfIds.has(scope)) || scopes.length === 0;
        })
        .filter(
          (lead) =>
            sizes.find(
              (size) => lead.companySize.total >= size.from && (size.to ? lead.companySize.total <= size.to : true)
            ) || sizes.length === 0
        );
    })
  );

  readonly leadList$: Observable<LeadModel[]> = this.leadListFiltered$.pipe(
    switchMap((leadList) =>
      this.activityList$.pipe(map((activityList) => this.mapLeadListActivities(leadList, activityList)))
    )
  );

  readonly isAdmin$: Observable<boolean> = this._userService.isAdmin().pipe(take(1));

  public readonly isFilterModalVisible$: Observable<boolean> = this._uiStateService.isFilterModalVisible$;

  constructor(
    private _leadsService: LeadsService,
    private _userService: UserService,
    private _activitiesService: ActivitiesService,
    private _uiStateService: UiStateService
  ) {}

  private mapLeadListActivities(leadList: LeadModel[], activites: ActivityModel[]): LeadModel[] {
    const activitiesMap = activites.reduce((a, c) => ({ ...a, [c.id]: c.name }), {} as Record<string, string>);

    return leadList.map((lead) => ({
      name: lead.name,
      websiteLink: lead.websiteLink.includes('http') ? lead.websiteLink : `http://${lead.websiteLink}`,
      annualRevenue: lead.annualRevenue,
      companySize: lead.companySize,
      hiring: lead.hiring,
      industry: lead.industry.toUpperCase(),
      linkedinLink: lead.linkedinLink,
      location: lead.location,
      activityIds: lead.activityIds.map((activityId) => activitiesMap[activityId])
    }));
  }

  public showFilterModal(): void {
    this._uiStateService.showFilterModal();
  }

  public hideFilterModal(): void {
    this._uiStateService.hideFilterModal();
  }

  private onActivityListAddControls(activityList: ActivityModel[]): void {
    activityList.forEach((activity) =>
      this.scopeForm.addControl(activity.id, new FormControl(false, { nonNullable: true }))
    );
  }

  private onLeadSizeListAddControls(leadSizeList: LeadSizeModel[]): void {
    leadSizeList.forEach((leadSize) =>
      this.sizeForm.addControl(leadSize.rangeId, new FormControl(false, { nonNullable: true }))
    );
  }

  public onResetButtonClearControls(): void {
    this.filterForm.reset();
  }

  private mapSizeIdsToSizeModelList(sizeList: LeadSizeModel[], sizeIds: string[]): LeadSizeModel[] {
    const sizeMap = sizeList.reduce((a, c) => ({ ...a, [c.rangeId]: c }), {} as Record<string, LeadSizeModel>);
    return sizeIds.map((sizeId) => sizeMap[sizeId]);
  }
}
