import { NgModule } from '@angular/core';

import { SigninRoutingModule } from './signin-routing.module';
import { FsSigninModule } from './signin.module';


@NgModule({
  imports: [
    FsSigninModule,
    SigninRoutingModule,
  ],
})
export class FsSigninRouteModule {

}
