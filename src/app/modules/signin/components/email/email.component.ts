import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input, Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { MatInput } from '@angular/material/input';

import { IFsVerificationMethod } from '@firestitch/2fa';
import { FsFormDirective } from '@firestitch/form';


import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { signinRequiresVerification } from '../../helpers';
import { SigninService } from '../../services';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent {

  @ViewChild('formFields', { read: ElementRef, static: false })
  public formFields: ElementRef;

  @ViewChild('emailInput', { read: MatInput })
  public emailInput: MatInput;

  @ViewChild(FsFormDirective)
  public form: FsFormDirective;

  @Input() public email;

  @Output() public signedIn = new EventEmitter<any>();
  @Output() public verificationRequired = new EventEmitter<IFsVerificationMethod>();
  @Output() public passwordReset = new EventEmitter<string>();
  @Output() public validated = new EventEmitter<{ email: string; password: string }>();
  @Output() public cleared = new EventEmitter<any>();

  public password: string;
  public passwordError;
  public action;

  constructor(
    private _signService: SigninService,
    private _cdRef: ChangeDetectorRef,
  ) { }

  public validateEmail = (control: UntypedFormControl): Observable<any> => {
    if(this.email && this.password) {
      return this._signService
        .signin(this.email, this.password)
        .pipe(
          tap((response) => this.signedIn.emit(response)),
          catchError((response) => {
            if (signinRequiresVerification(response.status)) {
              this.verificationRequired.emit(response?.error?.data?.verificationMethod);

              return of(true);
            }

            this.emailInput.focus();

            return throwError(response.error.message);
          }),
        );
    }
 
    return this._signService.signinExists(control.value)
      .pipe(
        switchMap((exists) => {
          if(exists) {
            this.validated.emit({ email: this.email, password: this.password });

            return of(true);
          }
            
          this.emailInput.focus();

          return throwError('Could not find your account');
        }),
      );
  };

  public submit = (): Observable<any> => {
    return of(true);
  };

  public emailChange(e): void {
    this.email = e.target.value;      
  }

  public passwordChange(e): void {
    this.password = e.target.value;      
    this.submit();
  }

  public keydown(event: KeyboardEvent): void {
    this.password = '';
    if (event.code === 'Tab') {
      this.form.triggerSubmit();
    }
  }

}
