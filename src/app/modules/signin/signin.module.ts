import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { FsPasswordModule } from '@firestitch/password';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsCommonModule } from '@firestitch/common';
import { Fs2faVerificationModule } from '@firestitch/2fa';

import { SigninService, SocialSigninService } from './services';
import { EmailComponent, PasswordComponent, CredentialsComponent, SigninComponent, SocialComponent } from './components';

import { TwoFactorVerificationModule } from './modules/two-factor-verification';
import { PasswordResetModule } from './modules/password-reset';
import { SocialSigninModule } from './modules/social-signin';
import { SIGNIN_CONFIG_ROOT } from './injectors';
import { SigninConfig } from './interfaces';
import { StackedButtonsModule } from './modules/stacked-buttons';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    FsPasswordModule,
    FsFormModule,
    Fs2faVerificationModule,
    FsPasswordModule,
    FsLabelModule,
    FsCommonModule,

    SocialSigninModule,
    StackedButtonsModule,
    TwoFactorVerificationModule,
    PasswordResetModule,
    SocialSigninModule,
  ],
  declarations: [
    CredentialsComponent,
    EmailComponent,
    PasswordComponent,
    SigninComponent,
    SocialComponent,
  ],
  exports: [
    SigninComponent
  ],
  providers: [
    SigninService,
    SocialSigninService,
  ],
})
export class FsSigninModule {
  public static forRoot(config: {
    factory: (...args: any) => SigninConfig;
    deps?: any[];
  }): ModuleWithProviders<FsSigninModule> {
    return {
      ngModule: FsSigninModule,
      providers: [
        { provide: SIGNIN_CONFIG_ROOT, useFactory: config.factory, deps: config.deps },
      ],
    };
  }

}
