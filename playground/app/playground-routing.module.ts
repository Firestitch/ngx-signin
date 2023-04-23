import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamplesComponent, SigninContainerComponent } from './components';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
  { 
    path: 'signin',
    component: SigninContainerComponent,
    children: [
      { path: '', loadChildren: () => import('../../src/app/modules/signin/signin.module').then((m) => m.SigninModule) },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PaygroundRoutingModule {
}
