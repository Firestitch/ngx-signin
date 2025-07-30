import { NgModule } from '@angular/core';

import { FsPasswordResetModule } from '@firestitch/password-reset';

import { PasswordData } from './data';
import { PasswordResetComponent } from './components';


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
