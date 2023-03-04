import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsComponent } from './components/leads/leads.component';
import { LeadsComponentModule } from './components/leads/leads.component-module';
import { RegisterComponent } from './components/register/register.component';
import { RegisterComponentModule } from './components/register/register.component-module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInComponentModule } from './components/sign-in/sign-in.component-module';

const routes: Routes = [
  { path: 'auth/login', component: SignInComponent },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'leads', component: LeadsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SignInComponentModule, RegisterComponentModule, LeadsComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
