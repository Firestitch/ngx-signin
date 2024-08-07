import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamplesComponent, SigninContainerComponent } from './components';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
  { 
    path: 'signin',
    component: SigninContainerComponent,
    children: [
      { path: '', loadChildren: () => import('../../src/app/modules/signin').then((m) => m.FsSigninRouteModule) },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PaygroundRoutingModule {
}
