import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeadListComponent } from '../components/lead-list/lead-list.component';
import { LeadListComponentModule } from '../components/lead-list/lead-list.component-module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'leads', component: LeadListComponent },
      { path: '', redirectTo: '/leads', pathMatch: 'full' }
    ]),
    LeadListComponentModule
  ],
  exports: []
})
export class LeadsRoutesModule {}
