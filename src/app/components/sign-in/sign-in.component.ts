import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });

  constructor(private _router: Router, private _authService: AuthService, private _cdr: ChangeDetectorRef) {}

  onLoginFormSubmited(loginForm: FormGroup): void {
    if (loginForm.valid) {
      this._authService
        .login(
          {
            email: loginForm.get('email')?.value,
            password: loginForm.get('password')?.value
          },
          loginForm.get('rememberMe')?.value
        )
        .pipe(take(1))
        .subscribe({
          next: (x) => this._router.navigate(['/leads']),
          error: (e) => {
            loginForm.setErrors({ errorFromServer: e.error.message });
            this._cdr.detectChanges();
          }
        });
    }
  }
}
