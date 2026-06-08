import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { IFsVerificationMethod } from '@firestitch/2fa';
import { FsCodeInputComponent, FsCodeInputModule } from '@firestitch/code-input';
import { FsFormDirective, FsFormModule } from '@firestitch/form';
import { FsMessage } from '@firestitch/message';

import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { signinRequiresVerification } from '../../helpers';
import { StackedButtonsComponent } from '../../modules/stacked-buttons/components/stacked-buttons/stacked-buttons.component';
import { SigninService } from '../../services';


@Component({
  selector: 'app-one-time-code',
  templateUrl: './one-time-code.component.html',
  styleUrls: ['./one-time-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    FsFormModule,
    FsCodeInputModule,
    MatIcon,
    MatButton,
    StackedButtonsComponent,
  ],
})
export class OneTimeCodeComponent implements OnInit {

  @ViewChild(FsFormDirective)
  public form: FsFormDirective;

  @ViewChild(FsCodeInputComponent)
  public codeInput: FsCodeInputComponent;

  @Input() public email;

  @Output() public signedIn = new EventEmitter<any>();
  @Output() public verificationRequired = new EventEmitter<IFsVerificationMethod>();
  @Output() public cancelled = new EventEmitter();

  public code: string;
  public codeLength: number;
  public resending = false;

  private _signService = inject(SigninService);
  private _message = inject(FsMessage);
  private _cdRef = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.codeLength = this._signService.verificationCodeLength || 6;
    this._sendCode().subscribe();
  }

  public codeCompleted(): void {
    this.form.triggerSubmit();
  }

  public changeEmail(): void {
    this.cancelled.emit();
  }

  public resend(): void {
    if (this.resending) {
      return;
    }

    this.resending = true;
    this._cdRef.markForCheck();

    this._sendCode()
      .pipe(
        finalize(() => {
          this.resending = false;
          this._cdRef.markForCheck();
        }),
      )
      .subscribe(() => {
        this._message.success('We sent you a new code');
      });
  }

  public submit = (): Observable<any> => {
    return this._signService
      .signin(this.email, this.code)
      .pipe(
        tap((response) => this.signedIn.emit(response)),
        catchError((response) => {
          if (signinRequiresVerification(response.status)) {
            this.verificationRequired.emit(response?.error?.data?.verificationMethod);

            return of(true);
          }

          this.code = '';
          this.codeInput?.clear();
          this.codeInput?.focusOnField(0);

          return throwError(() => new Error(response.error.message));
        }),
      );
  };

  private _sendCode(): Observable<boolean> {
    return this._signService
      .signinCode(this.email)
      .pipe(
        catchError((response) => {
          this._message.error(response?.error?.message);

          return of(false);
        }),
      );
  }

}
