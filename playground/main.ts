import { enableProdMode, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FsSocialSignin, GoogleSigninProvider, FacebookSigninProvider, AppleSigninProvider, SocialSigninConfig } from '@firestitch/social-signin';
import { of } from 'rxjs';
import { FS_API_REQUEST_INTERCEPTOR, FsApiModule } from '@firestitch/api';
import { ApiInterceptorFactory } from './app/interceptors';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FsSigninsModule, FsSigninModule, SigninConfig } from '@firestitch/signin';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsLabelModule } from '@firestitch/label';
import { FsStoreModule } from '@firestitch/store';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule, FsMessage } from '@firestitch/message';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsFilterModule } from '@firestitch/filter';
import { PaygroundRoutingModule } from './app/playground-routing.module';
import { tap } from 'rxjs/operators';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(FsApiModule.forRoot({ maxFileConnections: 5 }), BrowserModule, FsSigninsModule, FormsModule, FsLabelModule, FsStoreModule, FsExampleModule.forRoot(), FsMessageModule.forRoot(), FsDatePickerModule.forRoot(), FsFilterModule.forRoot({ case: 'camel', queryParam: true, chips: true }), PaygroundRoutingModule, FsDatePickerModule.forRoot(), FsSigninModule.forRoot({
            factory: (message: FsMessage): SigninConfig => {
                return {
                    trustedDeviceExpiryDays: 30,
                    showSocialSignins: true,
                    beforeProcessSignin: (response) => of(response),
                    processSignin: (response, redirect) => of(response, redirect)
                        .pipe(tap(() => message.success('Successfully signed in'))),
                    signinMeta: () => of({
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    }),
                    signinSubtitle: 'Your first step to a better future',
                    verificationCodeLength: 4,
                };
            },
            deps: [FsMessage],
        })),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { floatLabel: 'auto', appearance: 'outline' },
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (socialSignin: FsSocialSignin) => {
                return () => {
                    socialSignin.init({
                        providers: [
                            new GoogleSigninProvider('46829300559-tjhftg5s3ih3mnuq53pm9540nn5s43r9.apps.googleusercontent.com'),
                            new FacebookSigninProvider('197085513672785'),
                            new AppleSigninProvider('197085513672785'),
                        ],
                    } as SocialSigninConfig);
                    return of(null);
                };
            },
            deps: [FsSocialSignin],
            multi: true,
        },
        {
            provide: FS_API_REQUEST_INTERCEPTOR,
            useFactory: ApiInterceptorFactory,
        },
        provideAnimations(),
    ]
})
  .catch(err => console.error(err));

