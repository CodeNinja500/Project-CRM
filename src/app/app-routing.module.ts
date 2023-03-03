import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsComponent } from './components/leads/leads.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInComponentModule } from './components/sign-in/sign-in.component-module';

const routes: Routes = [
  { path: 'auth/login', component: SignInComponent },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  { path: '/leads', component: LeadsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SignInComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
