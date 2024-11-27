import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsBadgeModule } from '@firestitch/badge';
import { FsCountryModule } from '@firestitch/country';
import { FsDateModule } from '@firestitch/date';
import { FsDeviceModule } from '@firestitch/device';
import { FsIpModule } from '@firestitch/ip';
import { FsListModule } from '@firestitch/list';
import { FsPopoverModule } from '@firestitch/popover';

import { FsSigninsComponent } from './components/signins/signins.component';


@NgModule({
  imports: [
    CommonModule,

    MatIconModule,
    MatTooltipModule,

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
