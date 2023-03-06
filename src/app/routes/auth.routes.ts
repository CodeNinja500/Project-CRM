import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { RegisterComponentModule } from '../components/register/register.component-module';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignInComponentModule } from '../components/sign-in/sign-in.component-module';
import { AutoLoginGuard } from '../guards/auto-login.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        component: SignInComponent,
        data: { redirectAutoLogin: '/leads' },
        canActivate: [AutoLoginGuard]
      },
      { path: 'register', component: RegisterComponent }
    ]),
    SignInComponentModule,
    RegisterComponentModule
  ],
  exports: []
})
export class AuthRoutesModule {}
