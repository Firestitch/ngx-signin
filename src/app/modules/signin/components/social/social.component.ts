import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { SocialProcessingComponent } from '../../modules/social-signin/components/social-processing/social-processing.component';


@Component({
    templateUrl: './social.component.html',
    styleUrls: ['./social.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SocialProcessingComponent],
})
export class SocialComponent {
}
