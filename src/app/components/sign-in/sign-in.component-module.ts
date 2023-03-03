import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  declarations: [SignInComponent],
  providers: [],
  exports: [SignInComponent]
})
export class SignInComponentModule {}
