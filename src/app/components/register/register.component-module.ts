import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [RegisterComponent],
  providers: [],
  exports: [RegisterComponent]
})
export class RegisterComponentModule {
}
