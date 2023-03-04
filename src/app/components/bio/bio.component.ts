import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BioComponent {
  readonly bioForm: FormGroup = new FormGroup({ bioText: new FormControl() });
  readonly userDetails$: Observable<UserModel> = this._userService.me();

  constructor(private _userService: UserService) {}

  onBioFormSubmitted(bioForm: FormGroup): void {}
}
