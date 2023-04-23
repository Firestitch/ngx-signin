import {
  Component, ViewChild, ElementRef, ChangeDetectionStrategy,
  Input, Output, EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { FsFormDirective } from '@firestitch/form';
import { IFsVerificationMethod } from '@firestitch/2fa';

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
export class PasswordComponent {

  @ViewChild('formFields', { read: ElementRef, static: false })
  public formFields: ElementRef;

  @ViewChild('passwordInput', { read: ElementRef, static: false })
  public passwordInput: ElementRef;

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
          this.passwordInput.nativeElement.focus();

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
