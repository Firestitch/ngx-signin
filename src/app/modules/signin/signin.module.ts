import { ModuleWithProviders, NgModule } from '@angular/core';


import { CredentialsComponent, EmailComponent, PasswordComponent, SigninComponent, SocialComponent } from './components';
import { SIGNIN_CONFIG_ROOT } from './injectors';
import { SigninConfig } from './interfaces';
import { SigninService, SocialSigninService } from './services';


@NgModule({
  imports: [
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
