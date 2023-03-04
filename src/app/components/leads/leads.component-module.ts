import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeadsComponent } from './leads.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LeadsComponent],
  providers: [],
  exports: [LeadsComponent]
})
export class LeadsComponentModule {}
