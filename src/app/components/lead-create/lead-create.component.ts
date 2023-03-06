import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivityModel } from '../../models/activity.model';
import { ActivitiesService } from '../../services/activities.service';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-lead-create',
  templateUrl: './lead-create.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadCreateComponent {
  readonly activityList$: Observable<ActivityModel[]> = this._activitiesService
    .getAll()
    .pipe(tap((data) => this.onActivityListCreateControls(data)));

  readonly statusList$: Observable<string[]> = this._statusService.getAll();

  readonly leadInformationForm: FormGroup = new FormGroup({
    companyName: new FormControl(''),
    websiteLink: new FormControl(''),
    linkedinLink: new FormControl(''),
    location: new FormControl(''),
    industry: new FormControl(''),
    annualRevenue: new FormControl('')
  });

  readonly activitiesForm: FormGroup = new FormGroup({});

  readonly companySizeForm: FormGroup = new FormGroup({
    total: new FormControl(''),
    dev: new FormControl(''),
    fe: new FormControl('')
  });

  readonly hiringForm: FormGroup = new FormGroup({
    active: new FormControl(false),
    junior: new FormControl(false),
    talentProgram: new FormControl(false)
  });

  readonly leadForm: FormGroup = new FormGroup({
    leadInfo: this.leadInformationForm,
    activities: this.activitiesForm,
    companySize: this.companySizeForm,
    hiring: this.hiringForm,
    status: new FormControl(),
    notes: new FormControl()
  });

  constructor(private _activitiesService: ActivitiesService, private _statusService: StatusService) {}

  onActivityListCreateControls(activityList: ActivityModel[]): void {
    activityList.forEach((activity) => this.activitiesForm.addControl(activity.id, new FormControl(false)));
  }
}
