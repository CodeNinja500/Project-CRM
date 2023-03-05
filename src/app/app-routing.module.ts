import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioComponent } from './components/bio/bio.component';
import { BioComponentModule } from './components/bio/bio.component-module';
import { LeadsComponent } from './components/leads/leads.component';
import { LeadsComponentModule } from './components/leads/leads.component-module';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { SignOutComponentModule } from './components/sign-out/sign-out.component-module';
import { VerifyComponent } from './components/verify/verify.component';
import { VerifyComponentModule } from './components/verify/verify.component-module';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { ProfileCompletedGuard } from './guards/profile-completed.guard';
import { VerifedGuard } from './guards/verifed.guard';
import { AuthRoutesModule } from './routes/auth.routes';
import { LeadsRoutesModule } from './routes/leads.routes';

const routes: Routes = [
  { path: 'verify', component: VerifyComponent },
  { path: 'complete-profile', component: BioComponent },
  { path: 'logged-out', component: SignOutComponent },
  {
    path: 'auth',
    loadChildren: () => AuthRoutesModule
  },
  {
    path: '',
    component: LeadsComponent,
    loadChildren: () => LeadsRoutesModule,
    data: {
      redirectLoginUrl: '/auth/login',
      redirectVerifyUrl: '/verify',
      redirectCompleteProfileUrl: '/complete-profile'
    },
    canActivate: [IsLoggedInGuard, VerifedGuard, ProfileCompletedGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    VerifyComponentModule,
    BioComponentModule,
    LeadsComponentModule,
    SignOutComponentModule,
    AuthRoutesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
