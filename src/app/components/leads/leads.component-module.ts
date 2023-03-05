import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeadsComponent } from './leads.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LeadsComponent],
  providers: [],
  exports: [LeadsComponent]
})
export class LeadsComponentModule {}
