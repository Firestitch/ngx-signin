import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatAnchor, MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

import { IFsVerificationMethod } from '@firestitch/2fa';
import { FsAutoFocusDirective, FsCommonModule } from '@firestitch/common';
import { FsFormDirective, FsFormModule } from '@firestitch/form';
import { FsPasswordModule } from '@firestitch/password';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { signinRequiresVerification } from '../../helpers';
import { StackedButtonsComponent } from '../../modules/stacked-buttons/components/stacked-buttons/stacked-buttons.component';
import { SigninService } from '../../services';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    FsFormModule,
    MatIcon,
    MatAnchor,
    MatFormField,
    MatLabel,
    MatInput,
    FsPasswordModule,
    FsCommonModule,
    StackedButtonsComponent,
    MatButton,
  ],
})
export class PasswordComponent implements AfterContentInit {

  @ViewChild(FsAutoFocusDirective, { static: true })
  public autofocus: FsAutoFocusDirective;

  @ViewChild(FsFormDirective, { static: true })
  public form: FsFormDirective;

  @Input() public email;
  @Input() public password;
  @Input() public emailExists = false;

  @Output() public signedIn = new EventEmitter<any>();
  @Output() public verificationRequired = new EventEmitter<IFsVerificationMethod>();
  @Output() public emailChange = new EventEmitter<any>();
  @Output() public passwordReset = new EventEmitter<any>();

  constructor(
    private _signService: SigninService,
  ) { }

  public ngAfterContentInit(): void {
    if(this.email && this.password) {
      setTimeout(() => {
        this.form.triggerSubmit(); 
      });
    }
  }

  public validatePassword = (): Observable<any> => {
    return this._signService
      .signin(this.email, this.password)
      .pipe(
        tap((response) => this.signedIn.emit(response)),
        catchError((response) => {
          if (signinRequiresVerification(response.status)) {
            this.verificationRequired.emit(response?.error?.data?.verificationMethod);

            return of(true);
          }

          this.autofocus.focus();

          return throwError(() => new Error(response.error.message));
        }),
      );
  };

  public submit = (): Observable<any> => {
    return of(true);
  };

  public changeEmail(): void {
    this.emailChange.emit();
  }

}
