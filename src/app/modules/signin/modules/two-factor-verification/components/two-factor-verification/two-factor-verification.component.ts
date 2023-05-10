import {
  Component, ViewChild, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input,
} from '@angular/core';

import { FsFormDirective } from '@firestitch/form';
import { Fs2faVerificationComponent, IFsVerificationMethod } from '@firestitch/2fa';
import { FsMessage } from '@firestitch/message';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { SigninService } from '../../../../services';
import { VerificationData } from '../../data';


@Component({
  selector: 'app-two-factor-verification',
  templateUrl: './two-factor-verification.component.html',
  styleUrls: ['./two-factor-verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoFactorVerificationComponent implements OnInit {

  @ViewChild(FsFormDirective)
  public form: FsFormDirective;

  @ViewChild(Fs2faVerificationComponent)
  public verificationComponent: Fs2faVerificationComponent;

  @Input() public verificationMethod: IFsVerificationMethod;

  @Output() public cancelled = new EventEmitter();
  @Output() public signedIn = new EventEmitter<any>();

  public trustedDeviceExpiryDays;

  constructor(
    private _signService: SigninService,
    private _verificationData: VerificationData,
    private _message: FsMessage,
  ) { }

  public ngOnInit(): void {
    this.trustedDeviceExpiryDays = this._signService.trustedDeviceExpiryDays;
  }

  public cancel(): void {
    this.cancelled.emit();
  }

  public submit = (): Observable<any> => {
    return this._signService
      .signinVerify(this.verificationComponent.code, this.verificationComponent.trustDevice)
      .pipe(
        catchError((event) => {
          //EXCEPTION_CODE_INVALID_VERIFICATION_TOKEN
          if (event.error.code === 5700) {
            this.cancel();
          }

          this._message.error(event.error.message, {
            title: 'Verification Failed',
          });

          return throwError(null);
        }),
        tap((data) => {
          this.signedIn.emit(data);
        }),
      );
  };

  public getVerificationMethods = (): Observable<IFsVerificationMethod[]> => {
    return this._verificationData.getVerificationMethods()
      .pipe(
        catchError(() => {
          return throwError(null);
        }),
      );
  };

  public resend = (): Observable<void> => {
    return this._verificationData.resend()
      .pipe(
        catchError(() => {
          this.cancel();

          return throwError(null);
        }),
      );
  };

  public selectVerificationMethod = (verificationMethod: IFsVerificationMethod):
    Observable<IFsVerificationMethod> => {
    return this._verificationData.selectVerificationMethod(verificationMethod);
  };

}
