import { NgModule } from '@angular/core';

import { FsPasswordResetModule } from '@firestitch/password-reset';

import { PasswordResetComponent } from './components';
import { PasswordData } from './data';


// TODO: seems like module file is not used. Need to remove it.
@NgModule({
  imports: [
    FsPasswordResetModule,
    PasswordResetComponent,
  ],
  exports: [
    PasswordResetComponent,
  ],
  providers: [PasswordData],
})
export class PasswordResetModule {
}
