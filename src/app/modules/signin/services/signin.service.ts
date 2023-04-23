import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FsApi } from '@firestitch/api';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as CryptoJS from 'crypto-js';
import { formatInTimeZone } from 'date-fns-tz';

import { SIGNIN_CONFIG_INTERNAL } from '../injectors';
import { SigninConfig } from '../interfaces';


@Injectable()
export class SigninService {

  private _redirect: string;
  private _signinConfig: SigninConfig;

  constructor(
    protected _injector: Injector,
  ) {
    this._signinConfig = this._injector.get(SIGNIN_CONFIG_INTERNAL);

    const redirect = this._injector.get(ActivatedRoute).snapshot.queryParams.redirect;
    if(redirect) {
      this.setRedirect(redirect);
    }
  }

  public get signinConfig(): SigninConfig {
    return this._signinConfig;
  }

  public get api(): FsApi {
    return this._injector.get(FsApi);
  }

  public signin(
    email: string,
    password: string,
  ): Observable<any> {
    return this.api.post('auth/signin', {
      email,
      password,
      meta: this._signinMeta(),
    },
    { data: { handleError: false } })
      .pipe(
        switchMap((response: any) => {
          return this.processSignin(response);
        }),
      );
  }

  public signinVerify(
    code: any,
    trustedDevice: boolean,
  ): Observable<void> {
    return this.api.post('auth/signin/verify', {
      code,
      trust: trustedDevice,
    },
    { data:  { handleError: false } })
      .pipe(
        switchMap((response: any) => this.processSignin(response)),
      );
  }

  public signinExists(
    email: any,
  ): Observable<boolean> {
    return this.api.post('auth/signin/exists', {
      email,
    }, {
      key: 'exists',
    });
  }

  public processSignin(data): Observable<any> {
    return of(data)
      .pipe(
        switchMap((response) => this._signinConfig.beforeProcessSignin(response)),
        switchMap((response) => this._signinConfig.processSignin(response, this._redirect)),
        switchMap((response) => this._signinConfig.afterProcessSignin(response)),
      );
  }

  public setRedirect(redirect): void {
    this._redirect = redirect;
  }

  private _signinMeta() {
    if(!this._signinConfig.signinMeta) {
      return {};
    }

    const meta = JSON.stringify(this._signinConfig.signinMeta());
    const passcode = formatInTimeZone(new Date(), 'UTC', 'yyyy-MM-dd');
    const encrypted = CryptoJS.AES.encrypt(meta, passcode).toString();

    return encrypted;
  }

}
