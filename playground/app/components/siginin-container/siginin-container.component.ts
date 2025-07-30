import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatCard, MatCardContent } from '@angular/material/card';


@Component({
  templateUrl: './siginin-container.component.html',
  styleUrls: ['./siginin-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    RouterOutlet,
  ],
})
export class SigninContainerComponent {

}
