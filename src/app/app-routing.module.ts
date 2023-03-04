import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioComponent } from './components/bio/bio.component';
import { BioComponentModule } from './components/bio/bio.component-module';
import { LeadsComponent } from './components/leads/leads.component';
import { LeadsComponentModule } from './components/leads/leads.component-module';
import { RegisterComponent } from './components/register/register.component';
import { RegisterComponentModule } from './components/register/register.component-module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInComponentModule } from './components/sign-in/sign-in.component-module';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { SignOutComponentModule } from './components/sign-out/sign-out.component-module';
import { VerifyComponent } from './components/verify/verify.component';
import { VerifyComponentModule } from './components/verify/verify.component-module';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { ProfileCompletedGuard } from './guards/profile-completed.guard';
import { VerifedGuard } from './guards/verifed.guard';

const routes: Routes = [
  {
    path: 'auth/login',
    component: SignInComponent,
    data: { redirectAutoLogin: '/auth/login' },
    canActivate: [AutoLoginGuard]
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'complete-profile', component: BioComponent },
  {
    path: 'leads',
    component: LeadsComponent,
    data: {
      redirectLoginUrl: '/auth/login',
      redirectVerifyUrl: '/verify'
    },
    canActivate: [IsLoggedInGuard, VerifedGuard, ProfileCompletedGuard]
  },
  { path: 'logged-out', component: SignOutComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SignInComponentModule,
    RegisterComponentModule,
    VerifyComponentModule,
    BioComponentModule,
    LeadsComponentModule,
    SignOutComponentModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
