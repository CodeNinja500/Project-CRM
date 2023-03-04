import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BioComponent } from './bio.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  declarations: [BioComponent],
  providers: [],
  exports: [BioComponent]
})
export class BioComponentModule {}
