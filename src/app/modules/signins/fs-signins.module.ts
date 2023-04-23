import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { FsListModule } from '@firestitch/list';
import { FsDateModule } from '@firestitch/date';
import { FsCountryModule } from '@firestitch/country';
import { FsDeviceModule } from '@firestitch/device';
import { FsBadgeModule } from '@firestitch/badge';
import { FsIpModule } from '@firestitch/ip';
import { FsPopoverModule } from '@firestitch/popover';

import { FsSigninsComponent } from './components/signins/signins.component';


@NgModule({
  imports: [
    CommonModule,

    MatIconModule,

    FsListModule,
    FsDateModule,
    FsCountryModule,
    FsDeviceModule,
    FsBadgeModule,
    FsIpModule,
    FsPopoverModule,
  ],
  exports: [
    FsSigninsComponent,
  ],
  declarations: [
    FsSigninsComponent,
  ],
})
export class FsSigninsModule {
  static forRoot(): ModuleWithProviders<FsSigninsModule> {
    return {
      ngModule: FsSigninsModule,
    };
  }
}
