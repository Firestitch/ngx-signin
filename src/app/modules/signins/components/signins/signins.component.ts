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

import { index } from '@firestitch/common';
import { IFilterConfigItem, ItemType } from '@firestitch/filter';
import { FsListComponent, FsListConfig } from '@firestitch/list';
import { FsPrompt } from '@firestitch/prompt';

import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { SigninStates } from '../../../../consts/signin-states.const';
import { SigninVerificationCodeStates } from '../../../../consts/signin-verification-code-states.const';
import { ISignin } from '../../../../interfaces/signin';


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
  public prependFilters: IFilterConfigItem[];

  @Input()
  public signinsFetch: (query: any) => Observable<{
    data: ISignin[];
    paging?: any;
  }>;

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
  ) {}

  public ngOnInit(): void {
    this._initListConfig();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
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
        return this.signinsFetch(query)
          .pipe(
            map((response) => {
              return {
                data: response.data,
                paging: response.paging,
              };
            }),
          );
      },
    };
  }

}
