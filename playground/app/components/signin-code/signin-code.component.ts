import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatCard, MatCardContent } from '@angular/material/card';

import { FsMessage } from '@firestitch/message';
import { SigninComponent as FsSigninComponent, SigninConfig } from '@firestitch/signin';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-signin-code',
  templateUrl: './signin-code.component.html',
  styleUrls: ['./signin-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    FsSigninComponent,
  ],
})
export class SigninCodeComponent {

  private _message = inject(FsMessage);

  // Code-only: social buttons off so the "Sign in with a one-time code" link on
  // the password step is the single alternative path.
  public config: SigninConfig = {
    signinTitle: 'Sign in',
    signinSubtitle: 'Enter your email, then use the one-time code link',
    oneTimePassword: true,
    showSocialSignins: false,
    verificationCodeLength: 4,
    processSignin: (response) => of(response)
      .pipe(tap(() => this._message.success('Successfully signed in'))),
  };

}
