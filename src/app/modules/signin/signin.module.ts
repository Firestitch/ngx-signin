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

// import { LogoModule } from '../logo';

import { SigninService, SocialSigninService } from './services';
import { EmailComponent, PasswordComponent, CredentialsComponent } from './components';

import { SigninComponent, SocialComponent } from './views';
import { TwoFactorVerificationModule } from './modules/two-factor-verification';
import { PasswordResetModule } from './modules/password-reset';
import { SocialSigninModule } from './modules/social-signin';
import { SIGNIN_CONFIG, SIGNIN_CONFIG_INTERNAL, SIGNIN_CONFIG_ROOT } from './injectors';
import { signinConfig } from './helpers';
import { SigninConfig } from './interfaces';
import { SigninRoutingModule } from './signin-routing.module';
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
    FsFormModule,
    FsLabelModule,
    FsCommonModule,

    SocialSigninModule,
    //LogoModule,
    StackedButtonsModule,
    TwoFactorVerificationModule,
    PasswordResetModule,
    SocialSigninModule,
    SigninRoutingModule,
  ],
  declarations: [
    CredentialsComponent,
    EmailComponent,
    PasswordComponent,
    SigninComponent,
    SocialComponent,
  ],
  providers: [
    SigninService,
    SocialSigninService,
    {
      provide: SIGNIN_CONFIG_INTERNAL,
      useFactory: signinConfig,
      deps: [
        [new Optional(), new Inject(SIGNIN_CONFIG)],
        [new Optional(), new Inject(SIGNIN_CONFIG_ROOT)],
      ],
    },
  ],
})
export class SigninModule {
  public static forRoot(config: {
    factory: (...args: any) => SigninConfig;
    deps?: any[];
  }): ModuleWithProviders<SigninModule> {
    return {
      ngModule: SigninModule,
      providers: [
        { provide: SIGNIN_CONFIG_ROOT, useFactory: config.factory, deps: config.deps },
      ],
    };
  }

}
