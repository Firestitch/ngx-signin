import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { FsApi } from '@firestitch/api';
import { index } from '@firestitch/common';
import { IFilterConfigItem, ItemType } from '@firestitch/filter';
import { FsListComponent, FsListConfig } from '@firestitch/list';
import { FsPrompt } from '@firestitch/prompt';

import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { SigninStates } from '../../../../consts/signin-states.const';
import { SigninVerificationCodeStates } from '../../../../consts/signin-verification-code-states.const';


@Component({
  selector: 'fs-signins',
  templateUrl: './signins.component.html',
  styleUrls: ['./signins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsSigninsComponent implements OnInit, OnDestroy {

  @Input()
  public signinSignOut: (signin: any) => Observable<any>;

  @Input()
  public appendFilters: IFilterConfigItem[];

  @Input()
  public apiUrl = 'signins';

  @Input()
  public prependFilters: IFilterConfigItem[];

  @Input()
  public accountId: number;

  @Output()
  public accountClick = new EventEmitter();

  @ViewChild(FsListComponent)
  public listComponent: FsListComponent;

  public listConfig: FsListConfig;
  public SigninStates = index(SigninStates, 'value', 'name');
  public SigninVerificationCodeStates = index(SigninVerificationCodeStates, 'value', 'name');

  private _destroy$ = new Subject();

  constructor(
    private _prompt: FsPrompt,
    private _api: FsApi,
  ) { }

  public ngOnInit(): void {
    this._initListConfig();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public export(query) {
    this._api.createApiFile(`${this.apiUrl}/export`, query)
      .download();
  }

  private _initListConfig(): void {
    this.listConfig = {
      sort: { value: 'create_date', direction: 'desc' },
      filters: [
        ...(this.prependFilters || []),
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
        {
          name: 'createDate',
          type: ItemType.DateRange,
          label: ['From', 'To'],
        },
        {
          name: 'state',
          type: ItemType.Select,
          multiple: true,
          values: SigninStates,
          label: 'Status',
        },
        ...(this.appendFilters || []),
      ],
      actions: [
        {
          label: 'Export',
          primary: false,
          click: () => {
            this.export(this.listComponent.filterRef.filterParamsQuery);
          },
        },
      ],
      rowActions: this.signinSignOut ?
        [
          {
            label: 'Sign Out',
            click: (signout) => {
              this._prompt.confirm({
                title: 'Confirm',
                template: 'Are you sure you would like to sign out this sign in?',
              })
                .pipe(
                  switchMap(() => this.signinSignOut(signout)),
                  takeUntil(this._destroy$),
                )
                .subscribe(() => {
                  this.listComponent.reload();
                });
            },
          },
        ] : [],
      fetch: (query) => {
        if (!this.accountId) {
          query = {
            ...query,
            accounts: true,
            accountAvatars: true,
          };
        }

        query = {
          ...query,
          verificationCodes: true,
          ips: true,
          devices: true,
          accountId: this.accountId,
        };

        return this._api.get(this.apiUrl, query)
          .pipe(
            map((response) => {
              return {
                data: response.signins,
                paging: response.paging,
              };
            }),
          );
      },
    };
  }

}
