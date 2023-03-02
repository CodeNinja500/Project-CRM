import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInComponentModule } from './components/sign-in/sign-in.component-module';

const routes: Routes = [{ path: 'sign-in', component: SignInComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes), SignInComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
