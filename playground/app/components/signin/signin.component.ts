import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatCard, MatCardContent } from '@angular/material/card';

import { FsMessage } from '@firestitch/message';
import { SigninComponent as FsSigninComponent, SigninConfig } from '@firestitch/signin';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    FsSigninComponent,
  ],
})
export class SigninComponent {

  private _message = inject(FsMessage);

  // Every feature the component supports, switched on: social buttons, the
  // one-time-code path, 2FA trusted devices and the signin lifecycle hooks.
  public config: SigninConfig = {
    signinTitle: 'Sign in to your account',
    signinSubtitle: 'Your first step to a better future',
    oneTimePassword: true,
    showSocialSignins: true,
    trustedDeviceExpiryDays: 30,
    verificationCodeLength: 4,
    signinMeta: () => of({
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }),
    emailChanged: () => of(null)
      .pipe(tap(() => console.log('emailChanged'))),
    beforeProcessSignin: (response) => of(response)
      .pipe(tap(() => console.log('beforeProcessSignin', response))),
    processSignin: (response, redirect) => of(response)
      .pipe(tap(() => {
        console.log('processSignin', response, redirect);
        this._message.success('Successfully signed in');
      })),
    afterProcessSignin: (response) => of(response)
      .pipe(tap(() => console.log('afterProcessSignin', response))),
  };

}
