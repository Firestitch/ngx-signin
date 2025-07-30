import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from '@env';
import { FsExampleModule } from '@firestitch/example';
import { SigninsComponent } from '../signins/signins.component';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
    templateUrl: './examples.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsExampleModule,
        SigninsComponent,
        MatAnchor,
        RouterLink,
    ],
})
export class ExamplesComponent {
  public config = environment;
}
