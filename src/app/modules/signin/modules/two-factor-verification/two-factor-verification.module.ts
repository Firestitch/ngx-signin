import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { FsFormModule } from '@firestitch/form';
import { Fs2faVerificationModule } from '@firestitch/2fa';

import { TwoFactorVerificationComponent } from './components';
import { StackedButtonsModule } from '../stacked-buttons';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,

    MatButtonModule,

    FsFormModule,
    Fs2faVerificationModule,

    StackedButtonsModule,
  ],
  declarations: [
    TwoFactorVerificationComponent,
  ],
  exports: [
    TwoFactorVerificationComponent,
  ],
})
export class TwoFactorVerificationModule {
}
