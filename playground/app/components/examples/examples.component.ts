import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from '@env';
import { FsExampleModule } from '@firestitch/example';

import { SigninCodeComponent } from '../signin-code/signin-code.component';
import { SigninComponent } from '../signin/signin.component';
import { SigninsComponent } from '../signins/signins.component';


@Component({
    templateUrl: './examples.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsExampleModule,
        SigninComponent,
        SigninCodeComponent,
        SigninsComponent,
    ],
})
export class ExamplesComponent {
  public config = environment;
}
