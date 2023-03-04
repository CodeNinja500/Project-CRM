import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignOutComponent } from './sign-out.component';

@NgModule({
  imports: [RouterModule],
  declarations: [SignOutComponent],
  providers: [],
  exports: [SignOutComponent]
})
export class SignOutComponentModule {}
