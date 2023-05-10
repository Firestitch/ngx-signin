import { Injectable, Injector } from '@angular/core';

import { RequestConfig } from '@firestitch/api';
import { FsSocialSignin, Provider } from '@firestitch/social-signin';

import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SigninService } from './signin.service';


@Injectable()
export class SocialSigninService extends SigninService {

  constructor(
    protected _injector: Injector,
  ) {
    super(_injector);
  }

  public siginFacebook(
    code: string,
    redirectUri: string,
    config?: RequestConfig,
  ): Observable<any> {
    return this.api.post('auth/facebook', { code, redirectUri }, config)
      .pipe(
        switchMap((response: any) => this._processSignin(response)),
      );
  }

  public signinGoogle(
    code: string,
    redirectUri: string,
    config?: RequestConfig,
  ): Observable<any> {
    return this.api.post('auth/google', { code, redirectUri }, config)
      .pipe(
        switchMap((response: any) => this._processSignin(response)),
      );
  }

  public processOAuthResponse(): Observable<void> {
    return of(true)
      .pipe(
        switchMap(() => {
          if(!this._injector.get(FsSocialSignin).hasOAuthResponse) {
            return throwError(false);
          }

          const oAuthResponse = this._injector.get(FsSocialSignin).oAuthResponse;
          switch(oAuthResponse.provider) {
            case Provider.Facebook:
              return this
                .siginFacebook(oAuthResponse.code,oAuthResponse.redirectUri);

            case Provider.Google:
              return this
                .signinGoogle(oAuthResponse.code,oAuthResponse.redirectUri);
          }

          return throwError(false);
        }),
      );
  }

}
