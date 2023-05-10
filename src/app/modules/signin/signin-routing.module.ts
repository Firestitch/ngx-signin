import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent, SocialComponent } from './components';

const routes: Routes = [
  { path: '', component: SigninComponent, pathMatch: 'full' },
  { path: 'social', component: SocialComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninRoutingModule {
}
