import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsSigninsModule, SigninConfig, SigninModule } from '@firestitch/signin';
import { FsLabelModule } from '@firestitch/label';
import { FsStoreModule } from '@firestitch/store';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';
import {
  ExamplesComponent, SigninContainerComponent
} from './components';
import { AppComponent } from './app.component';
import { SigninsComponent } from './components/signins';
import { FsFilterModule } from '@firestitch/filter';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsPopoverModule } from '@firestitch/popover';
import { of } from 'rxjs';
import { FS_SOCIAL_SIGNIN_CONFIG } from '@firestitch/social-signin';
import { FS_API_REQUEST_INTERCEPTOR, FsApiModule } from '@firestitch/api';
import { PaygroundRoutingModule } from './playground-routing.module';
import { ApiInterceptorFactory } from './interceptors';


@NgModule({
  bootstrap: [ AppComponent ],
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
    FsPopoverModule.forRoot(),
    FsMessageModule.forRoot(),
    FsDatePickerModule.forRoot(),
    FsFilterModule.forRoot({ case: 'camel', queryParam: true, chips: true }),
    ToastrModule.forRoot({ preventDuplicates: true }),
    PaygroundRoutingModule,
    FsDatePickerModule.forRoot(),
    SigninModule.forRoot({
      factory: (): SigninConfig => {
        return {
          trustedDeviceExpiryDays: 30,
          beforeProcessSignin:  (response) => of(response),
          processSignin:  (response, redirect) => of(response, redirect),
          signinMeta: () => ({
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
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
