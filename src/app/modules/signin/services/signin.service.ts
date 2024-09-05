import { Injectable, Injector } from '@angular/core';

import { DisplayApiError, FsApi } from '@firestitch/api';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { HttpContext } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { formatInTimeZone } from 'date-fns-tz';

import { SIGNIN_CONFIG, SIGNIN_CONFIG_ROOT } from '../injectors';
import { SigninConfig } from '../interfaces';


@Injectable()
export class SigninService {

  private _redirect: string;
  private _signinRootConfig: SigninConfig;
  private _signinProviderConfig: SigninConfig;
  private _signinConfig: SigninConfig = {};

  constructor(
    protected _injector: Injector,
  ) {
    this._signinRootConfig = this._injector.get(SIGNIN_CONFIG_ROOT, null) || {};
    this._signinProviderConfig = this._injector.get(SIGNIN_CONFIG, null) || {};
  }

  public set signinConfig(config: SigninConfig) {
    this._signinConfig = config;
  }

  public get signinConfig() {
    return {
      signinTitle: 'Sign in to your account',
      ...this._signinRootConfig,
      ...this._signinProviderConfig,
      ...this._signinConfig,
    };
  }

  public get verificationCodeLength() {
    return this.getConfig('verificationCodeLength');
  }

  public set redirect(redirect) {
    this._redirect = redirect;
  }

  public get trustedDeviceExpiryDays(): number { 
    return (this.getConfig('trustedDeviceExpiryDays')) || 0;
  }

  public get showSocialSignins(): boolean { 
    return this.getConfig('showSocialSignins') || false;
  }

  public emailChanged(): Observable<any> {
    return (this.getConfig('emailChanged') || (() => of(null)))();
  }

  public beforeProcessSignin(response): Observable<any> {
    return (this.getConfig('beforeProcessSignin') || ((_response) => of(_response)))(response);
  }

  public processSignin(response, redirect): Observable<any> {
    return (this.getConfig('processSignin') || ((_response, _redirect) => of(_response)))(response, redirect);
  }

  public afterProcessSignin(response): Observable<any> {
    return (this.getConfig('afterProcessSignin') || ((_response) => of(_response)))(response);
  }

  public signinMeta(): Observable<any> {
    return (this.getConfig('signinMeta') || (() => of({})))();
  }

  public getConfig(name, _default = null): any {
    return this._signinConfig[name] || this._signinProviderConfig[name] || this._signinRootConfig[name] || _default;
  }

  public get api(): FsApi {
    return this._injector.get(FsApi);
  }

  public signin(
    email: string,
    password: string,
  ): Observable<any> {
    return this._signinMeta()
      .pipe(
        switchMap((meta) => this.api.post(this.getConfig('signinUrl', 'auth/signin'), {
          email,
          password,
          meta,
        },
        { 
          data: { handleError: false },
          context: new HttpContext().set(DisplayApiError, false),
        }),
        ),
        switchMap((response: any) => {
          return this._processSignin(response);
        }),
      );
  }

  public signinVerify(
    code: any,
    trustedDevice: boolean,
  ): Observable<void> {
    return this._signinMeta()
      .pipe(
        switchMap((meta) =>
          this.api.post(this.getConfig('signinVerifyUrl', 'auth/signin/verify'), {
            code,
            trust: trustedDevice,
            meta,
          },
          { 
            data: { handleError: false },
            context: new HttpContext().set(DisplayApiError, false),
          }),
        ),  
        switchMap((response: any) => this._processSignin(response)),
      );
  }

  public signinExists(
    email: any,
  ): Observable<boolean> {
    return this.api.post(this.getConfig('signinExistsUrl', 'auth/signin/exists'), {
      email,
    }, {
      key: 'exists',
    });
  }

  public _processSignin(data): Observable<any> {
    return of(data)
      .pipe(
        switchMap((response) => this.beforeProcessSignin(response)),
        switchMap((response) => this.processSignin(response, this._redirect)),
        switchMap((response) => this.afterProcessSignin(response)),
      );
  }

  private _signinMeta(): Observable<string> {
    if(!this.getConfig('signinMeta')) {
      return of('');
    }
   
    return this.signinMeta()
      .pipe(
        map((meta) => {
          const data = JSON.stringify(meta);
          const passcode = formatInTimeZone(new Date(), 'UTC', 'yyyy-MM-dd');

          return CryptoJS.AES.encrypt(data, passcode).toString();    
        }),
      );
  }

}
