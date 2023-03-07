import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ActivityModel } from '../../models/activity.model';
import { ActivitiesService } from '../../services/activities.service';
import { StatusService } from '../../services/status.service';
import { LeadsService } from '../../services/leads.service';

export const minOneSelected: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const howManySelected = Object.keys(control.value).reduce((a: string[], c: string) => {
    if (control.value[c]) {
      return [...a, c];
    } else {
      return a;
    }
  }, []).length;
  if (howManySelected > 0) {
    return null;
  } else {
    return { minOneSelected: true };
  }
};

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
    companyName: new FormControl('', [Validators.required]),
    websiteLink: new FormControl('', [Validators.required, Validators.pattern(/^((https?:\/\/)?(www\.)?).+\.\w+/)]),
    linkedinLink: new FormControl('', [
      Validators.required,
      Validators.pattern(/^((https?:\/\/)?(www\.)?linkedin\.com\/)\w+/)
    ]),
    location: new FormControl('', [Validators.required]),
    industry: new FormControl('', [Validators.required]),
    annualRevenue: new FormControl('', [Validators.required])
  });

  readonly activitiesForm: FormGroup = new FormGroup({}, [minOneSelected]);

  readonly companySizeForm: FormGroup = new FormGroup({
    total: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    dev: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    fe: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)])
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
    status: new FormControl('', [Validators.required]),
    notes: new FormControl('')
  });

  constructor(
    private _activitiesService: ActivitiesService,
    private _statusService: StatusService,
    private _leadsService: LeadsService
  ) {}

  onActivityListCreateControls(activityList: ActivityModel[]): void {
    activityList.forEach((activity) => this.activitiesForm.addControl(activity.id, new FormControl(false)));
  }

  onLeadFormSubmitted(): void {
    if (this.leadForm.valid) {
      this._leadsService
        .create({
          name: this.leadInformationForm.get('companyName')?.value,
          websiteLink: this.leadInformationForm.get('websiteLink')?.value,
          linkedinLink: this.leadInformationForm.get('linkedinLink')?.value,
          location: this.leadInformationForm.get('location')?.value,
          industry: this.leadInformationForm.get('industry')?.value,
          annualRevenue: +this.leadInformationForm.get('annualRevenue')?.value,
          activityIds: Object.keys(this.activitiesForm.value).reduce((a: string[], c: string) => {
            if (this.activitiesForm.value[c]) {
              return [...a, c];
            } else {
              return a;
            }
          }, []),
          companySize: {
            total: this.companySizeForm.get('total')?.value,
            dev: this.companySizeForm.get('dev')?.value,
            fe: this.companySizeForm.get('fe')?.value
          },
          hiring: {
            active: this.hiringForm.get('active')?.value,
            junior: this.hiringForm.get('junior')?.value,
            talentProgram: this.hiringForm.get('talentProgram')?.value
          }
        })
        .pipe(take(1))
        .subscribe();
    } else {
      this.leadForm.markAllAsTouched();
    }
  }
}
