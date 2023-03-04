import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

export const minTenWords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const bioText = control.value as string;
  if (bioText) {
    return bioText.match(/(\s\S+){9,}/) ? null : { minTenWords: true };
  } else return null;
};

export const minTwoSentences: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const bioText = control.value as string;
  if (bioText) {
    return bioText.match(/.+[.!?].+\w+/) ? null : { minTwoSentences: true };
  } else return null;
};

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BioComponent {
  readonly bioForm: FormGroup = new FormGroup({
    bioText: new FormControl('', [Validators.required, minTenWords, minTwoSentences])
  });
  readonly userDetails$: Observable<UserModel> = this._userService.me();

  constructor(private _userService: UserService, private _router: Router, private _cdr: ChangeDetectorRef) {}

  onBioFormSubmitted(bioForm: FormGroup): void {
    if (bioForm.valid) {
      this._userService
        .postUserBio(bioForm.get('bioText')?.value)
        .pipe(take(1))
        .subscribe({
          next: (x) => this._router.navigate(['/leads']),
          error: (e) => {
            bioForm.setErrors({ errorFromServer: e.error.message });
            this._cdr.detectChanges();
          }
        });
    }
  }
}
