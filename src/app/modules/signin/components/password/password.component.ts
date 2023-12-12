import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { IFsVerificationMethod } from '@firestitch/2fa';
import { FsAutofocusDirective } from '@firestitch/common';
import { FsFormDirective } from '@firestitch/form';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { signinRequiresVerification } from '../../helpers';
import { SigninService } from '../../services';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordComponent implements AfterContentInit {

  @ViewChild(FsAutofocusDirective)
  public passwordInput: FsAutofocusDirective;

  @ViewChild(FsFormDirective)
  public form: FsFormDirective;

  @Input() public email;
  @Input() public password;
  @Input() public emailExists = false;

  @Output() public signedIn = new EventEmitter<any>();
  @Output() public verificationRequired = new EventEmitter<IFsVerificationMethod>();
  @Output() public emailChange = new EventEmitter<any>();
  @Output() public passwordReset = new EventEmitter<any>();

  public passwordError;

  constructor(
    private _signService: SigninService,
  ) { }

  public ngAfterContentInit(): void {
    if (!this.password) {
      this.passwordInput.focus();
    }
  }

  public validatePassword = (control: FormControl): Observable<any> => {
    if (this.passwordError) {
      return throwError(this.passwordError);
    }

    return of(true);
  };

  public submit = (): Observable<any> => {
    return this.signin(this.email, this.password);
  };

  public signin(email, password): Observable<any> {
    return this._signService
      .signin(email, password)
      .pipe(
        tap((response) => this.signedIn.emit(response)),
        catchError((response) => {
          if (signinRequiresVerification(response.status)) {
            this.verificationRequired.emit(response?.error?.data?.verificationMethod);

            return of(true);
          }

          this.passwordError = response.error.message;
          this.form.ngForm.controls.password.updateValueAndValidity();
          this.passwordInput.focus();

          return of(true);
        }),
      );
  }

  public changeEmail(): void {
    this.emailChange.emit();
  }

  public clearPassword(): void {
    this.passwordError = null;
    this.form.ngForm.controls.password.updateValueAndValidity();
  }

}
