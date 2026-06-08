
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFsVerificationMethod } from '@firestitch/2fa';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { signinRequiresVerification } from '../../helpers';
import { SigninConfig } from '../../interfaces';
import { PasswordResetComponent } from '../../modules/password-reset/components/password-reset/password-reset.component';
import { TwoFactorVerificationComponent } from '../../modules/two-factor-verification/components/two-factor-verification/two-factor-verification.component';
import { SigninService } from '../../services';
import { CredentialsComponent } from '../credentials/credentials.component';
import { OneTimeCodeComponent } from '../one-time-code/one-time-code.component';


@Component({
  selector: 'fs-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CredentialsComponent,
    TwoFactorVerificationComponent,
    PasswordResetComponent,
    OneTimeCodeComponent
],
})
export class SigninComponent implements OnInit {

  @Input() public config: SigninConfig;
  @Input() public redirect: string;
  @Input() public email: string;

  public mode: 'signin' | 'two-factor' | 'password-reset' | 'one-time-code' = 'signin';
  public verificationMethod: IFsVerificationMethod;
  public passwordResetTitle: string;
  public passwordResetSubtitle: string;
  public signinTitle;
  public signinSubtitle;
  public signinContainerComponent;

  private _signService = inject(SigninService);  
  private _route = inject(ActivatedRoute);
  private _cdRef = inject(ChangeDetectorRef);  

  public ngOnInit(): void {
    this._signService.signinConfig = {
      ...this._signService.signinConfig,
      ...this.config,
    };

    this.signinTitle = this._signService.signinConfig.signinTitle;
    this.signinSubtitle = this._signService.signinConfig.signinSubtitle;

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

  public oneTimePasswordMode(email: string): void {
    this.email = email;
    this._switchMode('one-time-code');
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

  private _switchMode(mode: 'two-factor' | 'signin' | 'password-reset' | 'one-time-code') {
    this.mode = mode;
    this._cdRef.markForCheck();
  }

}
