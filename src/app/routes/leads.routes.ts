import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeadCreateComponent } from '../components/lead-create/lead-create.component';
import { LeadCreateComponentModule } from '../components/lead-create/lead-create.component-module';
import { LeadListComponent } from '../components/lead-list/lead-list.component';
import { LeadListComponentModule } from '../components/lead-list/lead-list.component-module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'leads', component: LeadListComponent },
      { path: 'create-lead', component: LeadCreateComponent },
      { path: '', redirectTo: '/leads', pathMatch: 'full' }
    ]),
    LeadListComponentModule,
    LeadCreateComponentModule
  ],
  exports: []
})
export class LeadsRoutesModule {}
