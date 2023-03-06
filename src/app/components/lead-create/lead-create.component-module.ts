import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LeadCreateComponent } from './lead-create.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  declarations: [LeadCreateComponent],
  providers: [],
  exports: [LeadCreateComponent]
})
export class LeadCreateComponentModule {}
