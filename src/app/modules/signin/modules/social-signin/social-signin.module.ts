import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { FsSocialSigninModule } from '@firestitch/social-signin';

//import { LogoModule } from '../../../logo';
import { OrLineModule } from '../or-line';

import {
  SocialProcessingComponent,
  SocialSigninComponent,
} from './components';


@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,

    FsSocialSigninModule,

    OrLineModule,
    //LogoModule,
  ],
  declarations: [
    SocialSigninComponent,
    SocialProcessingComponent,
  ],
  exports: [
    SocialSigninComponent,
    SocialProcessingComponent,
  ],
})
export class SocialSigninModule { }
