import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BioComponent {
  readonly bioForm: FormGroup = new FormGroup({ bioText: new FormControl() });

  onBioFormSubmitted(bioForm: FormGroup): void {}
}
