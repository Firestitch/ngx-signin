import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Fs2faVerificationModule } from '@firestitch/2fa';
import { FsCommonModule } from '@firestitch/common';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsPasswordModule } from '@firestitch/password';

import { CredentialsComponent, EmailComponent, PasswordComponent, SigninComponent, SocialComponent } from './components';
import { SIGNIN_CONFIG_ROOT } from './injectors';
import { SigninConfig } from './interfaces';
import { PasswordResetModule } from './modules/password-reset';
import { SocialSigninModule } from './modules/social-signin';
import { StackedButtonsModule } from './modules/stacked-buttons';
import { TwoFactorVerificationModule } from './modules/two-factor-verification';
import { SigninService, SocialSigninService } from './services';


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
    MatIconModule,

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
    SigninComponent,
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
