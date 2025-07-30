import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { FsMessage, MessageMode } from '@firestitch/message';

import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SocialSigninService } from '../../../../services';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
    selector: 'app-social-processing',
    templateUrl: './social-processing.component.html',
    styleUrls: ['./social-processing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatProgressSpinner],
})
export class SocialProcessingComponent implements OnInit {

  @Input() public errorUrl;

  constructor(
    private _socialSigninService: SocialSigninService,
    private _message: FsMessage,
    private _router: Router,
  ) { }

  public ngOnInit(): void {
    this._socialSigninService.processOAuthResponse()
      .pipe(
        catchError(() => {
          this._message.error('There was a problem trying to signin', { mode: MessageMode.Banner });
          this._router.navigateByUrl(this.errorUrl);

          return of();
        }),
      )
      .subscribe();
  }

}
