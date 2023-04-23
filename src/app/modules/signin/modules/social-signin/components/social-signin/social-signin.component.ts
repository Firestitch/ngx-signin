import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FsSocialSignin } from '@firestitch/social-signin';


@Component({
  selector: 'app-social-signin',
  templateUrl: './social-signin.component.html',
  styleUrls: ['./social-signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialSigninComponent {

  public redirectUri;

  constructor(
    private _socialSignin: FsSocialSignin,
  ) {
    const url = new URL(window.location.origin + window.location.pathname);
    url.pathname = `${url.pathname}/social`;
    this.redirectUri = url.toString();
  }

  public get hasSocialProviders(): boolean {
    return this._socialSignin.hasSigninProviders;
  }

}
