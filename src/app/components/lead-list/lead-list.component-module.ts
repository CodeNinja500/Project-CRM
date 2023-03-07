import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeadListComponent } from './lead-list.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LeadListComponent],
  providers: [],
  exports: [LeadListComponent]
})
export class LeadListComponentModule {}
