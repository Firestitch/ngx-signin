import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsLabelModule } from '@firestitch/label';
import { FsMessageModule } from '@firestitch/message';
import { FsSigninModule, FsSigninsModule, SigninConfig } from '@firestitch/signin';
import { FsStoreModule } from '@firestitch/store';


import { FS_API_REQUEST_INTERCEPTOR, FsApiModule } from '@firestitch/api';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsFilterModule } from '@firestitch/filter';
import { FS_SOCIAL_SIGNIN_CONFIG } from '@firestitch/social-signin';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import {
  ExamplesComponent, SigninContainerComponent
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
      factory: (): SigninConfig => {
        return {
          trustedDeviceExpiryDays: 30,
          beforeProcessSignin: (response) => of(response),
          processSignin: (response, redirect) => of(response, redirect),
          signinMeta: () => ({
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
          verificationCodeLength: 4,
          //signinContainerTemplate: () => (SigninContainerComponent)
        };
      },
    }),
  ],
  providers: [
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
