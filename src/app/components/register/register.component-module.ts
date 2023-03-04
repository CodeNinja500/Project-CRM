import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  declarations: [RegisterComponent],
  providers: [],
  exports: [RegisterComponent]
})
export class RegisterComponentModule {}
