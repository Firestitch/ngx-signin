import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FsSocialSigninModule } from '@firestitch/social-signin';

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
