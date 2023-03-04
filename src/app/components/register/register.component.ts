import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export const hasSmallLetter: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.value as string;
  if (password.match(/[a-z]+/)) return null;
  else return { hasSmallLetter: true };
};

export const hasCapitalLetter: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.value as string;
  if (password.match(/[A-Z]+/)) return null;
  else return { hasCapitalLetter: true };
};

export const hasSpecialSign: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.value as string;
  if (password.match(/[^a-zA-Z]+/)) return null;
  else return { hasSpecialSign: true };
};

export const hasNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.value as string;
  if (password.match(/[0-9]+/)) return null;
  else return { hasNumber: true };
};

export const passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value as string;
  const repeatPassword = control.get('repeatPassword')?.value as string;

  if (password && repeatPassword) {
    password === repeatPassword ? null : { passwordsMatch: true };
  }
  return null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  readonly registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        hasSmallLetter,
        hasCapitalLetter,
        hasSpecialSign,
        hasNumber
      ]),
      repeatPassword: new FormControl('', [Validators.required]),
      termsPolicy: new FormControl(false, [Validators.requiredTrue])
    },
    { validators: passwordsMatch }
  );
}
