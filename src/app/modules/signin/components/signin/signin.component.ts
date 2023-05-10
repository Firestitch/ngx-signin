import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Input,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFsVerificationMethod } from '@firestitch/2fa';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { SigninService } from '../../services';
import { signinRequiresVerification } from '../../helpers';
import { SigninConfig } from '../../interfaces';


@Component({
  selector: 'fs-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent implements OnInit {

  @Input() public config: SigninConfig;
  @Input() public redirect: string;
  @Input() public email: string;

  public mode: 'signin' | 'two-factor' | 'password-reset' = 'signin';
  public verificationMethod: IFsVerificationMethod;
  public passwordResetTitle: string;
  public signinContainerComponent;

  constructor(
    private _signService: SigninService,
    private _cdRef: ChangeDetectorRef,
    private _route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._signService.signinConfig = this.config;
    const redirect = this.redirect ? 
      this.redirect : this._route.snapshot.queryParams.redirect;

    if(redirect) {
      this._signService.redirect = redirect;
    }
  }

  public verificationRequired(verificationMethod: IFsVerificationMethod): void {
    this.verificationMethod = verificationMethod;
    this._switchMode('two-factor');
  }

  public signinMode(): void {
    this._switchMode('signin');
  }

  public passwordResetMode(email): void {
    this.email = email;
    this._switchMode('password-reset');
  }

  public passwordResetCompleted(event): void {
    this._signService
      .signin(event.email, event.password)
      .pipe(
        catchError((response) => {
          if (signinRequiresVerification(response?.status)) {
            this.verificationRequired(response?.error?.data?.verificationMethod);
          } else {
            this._switchMode('signin');
          }

          this._cdRef.markForCheck();

          return throwError(response);
        }),
      )
      .subscribe();
  }

  private _switchMode(mode: 'two-factor' | 'signin' | 'password-reset') {
    this.mode = mode;
    this._cdRef.markForCheck();
  }

}
