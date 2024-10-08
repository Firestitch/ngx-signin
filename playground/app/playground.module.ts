import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { FS_API_REQUEST_INTERCEPTOR, FsApiModule } from '@firestitch/api';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsExampleModule } from '@firestitch/example';
import { FsFilterModule } from '@firestitch/filter';
import { FsLabelModule } from '@firestitch/label';
import { FsMessage, FsMessageModule } from '@firestitch/message';
import { FsSigninModule, FsSigninsModule, SigninConfig } from '@firestitch/signin';
import { FS_SOCIAL_SIGNIN_CONFIG } from '@firestitch/social-signin';
import { FsStoreModule } from '@firestitch/store';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  ExamplesComponent, SigninContainerComponent,
} from './components';
import { SigninsComponent } from './components/signins';
import { ApiInterceptorFactory } from './interceptors';
import { AppMaterialModule } from './material.module';
import { PaygroundRoutingModule } from './playground-routing.module';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    FsApiModule.forRoot({ maxFileConnections: 5 }),
    BrowserModule,
    FsSigninsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsLabelModule,
    FsStoreModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    FsDatePickerModule.forRoot(),
    FsFilterModule.forRoot({ case: 'camel', queryParam: true, chips: true }),
    PaygroundRoutingModule,
    FsDatePickerModule.forRoot(),
    FsSigninModule.forRoot({
      factory: (message: FsMessage): SigninConfig => {
        return {
          trustedDeviceExpiryDays: 30,
          beforeProcessSignin: (response) => of(response),
          processSignin: (response, redirect) => of(response, redirect)
            .pipe(
              tap(() => message.success('Successfully signed in')),
            ),
          signinMeta: () => of({
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
          signinSubtitle: 'Your first step to a better future',
          verificationCodeLength: 4,
        };
      },
      deps: [FsMessage],
    }),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'auto', appearance: 'outline' },
    },
    {
      provide: FS_SOCIAL_SIGNIN_CONFIG,
      useFactory: () => {
        return {
          providers: [],
        };
      },
    },
    {
      provide: FS_API_REQUEST_INTERCEPTOR,
      useFactory: ApiInterceptorFactory,
    },
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    SigninsComponent,
    SigninContainerComponent,
  ],
})
export class PlaygroundModule {
}
