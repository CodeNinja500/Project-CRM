import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsComponent } from './components/leads/leads.component';
import { LeadsComponentModule } from './components/leads/leads.component-module';
import { RegisterComponent } from './components/register/register.component';
import { RegisterComponentModule } from './components/register/register.component-module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInComponentModule } from './components/sign-in/sign-in.component-module';
import { VerifyComponent } from './components/verify/verify.component';
import { VerifyComponentModule } from './components/verify/verify.component-module';
import { VerifedGuard } from './guards/verifed.guard';

const routes: Routes = [
  { path: 'auth/login', component: SignInComponent },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'leads', component: LeadsComponent, canActivate: [VerifedGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SignInComponentModule,
    RegisterComponentModule,
    VerifyComponentModule,
    LeadsComponentModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
