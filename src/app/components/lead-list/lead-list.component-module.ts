import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeadListComponent } from './lead-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LeadListComponent],
  providers: [],
  exports: [LeadListComponent]
})
export class LeadListComponentModule {}
