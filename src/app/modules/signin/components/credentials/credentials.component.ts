import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFsVerificationMethod } from '@firestitch/2fa';

import { Subject } from 'rxjs';

import { SigninService } from '../../services';


@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CredentialsComponent implements OnInit, OnDestroy {

  @Input() public email;

  @Output() public signedIn = new EventEmitter<any>();
  @Output() public verificationRequired = new EventEmitter<IFsVerificationMethod>();
  @Output() public passwordReset = new EventEmitter<string>();

  public password: string;
  public mode: 'email' | 'password' = 'email';

  private _destroy$ = new Subject();

  constructor(
    private _signinService: SigninService,
    private _route: ActivatedRoute,
    private _cdRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    if (!this.email) {
      this.email = this._route.snapshot.queryParams.email;
    }

    if (this.email) {
      this.mode = 'password';
    }
  }

  public get showSocialSignins(): boolean {
    return this._signinService.showSocialSignins;
  }

  public onSignedIn($event): void {
    this.signedIn.emit($event);
  }

  public emailChange(): void {
    this._signinService.emailChanged()
      .subscribe(() => {
        this.mode = 'email';
        this.email = '';
        this.password = '';
        this._cdRef.markForCheck();
      });
  }

  public emailValidated(event): void {
    this.mode = 'password';
    this.email = event.email;
    this.password = event.password;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
