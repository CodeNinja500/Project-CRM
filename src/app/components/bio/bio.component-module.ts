import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BioComponent } from './bio.component';

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [BioComponent],
  providers: [],
  exports: [BioComponent]
})
export class BioComponentModule {
}
