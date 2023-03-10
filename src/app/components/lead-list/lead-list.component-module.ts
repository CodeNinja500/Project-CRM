import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LeadListComponent } from './lead-list.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [LeadListComponent],
  providers: [],
  exports: [LeadListComponent]
})
export class LeadListComponentModule { }
