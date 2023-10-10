import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input, Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { IFsVerificationMethod } from '@firestitch/2fa';
import { FsFormDirective } from '@firestitch/form';

import { Observable, of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { MatInput } from '@angular/material/input';
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

  @ViewChild('passwordInput', { read: MatInput })
  public passwordInput: MatInput;

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

  public validateExists = (control: FormControl): Observable<any> => {
    if (control.value) {
      return this._signService.signinExists(control.value)
        .pipe(
          switchMap((exists) => {
            return exists ? of(true) : throwError('Could not find your account');
          }),
          tap(() => this.passwordInput.focus()),
        );
    }

    return of(true);
  };

  public submit = (): Observable<any> => {
    this.validated.emit({ email: this.email, password: this.password });
    this._cdRef.markForCheck();

    return of(true);
  };

  public changeEmail(): void {
    this.cleared.emit();
  }

  public keydown(event: KeyboardEvent): void {
    if (event.code === 'Tab') {
      this.form.triggerSubmit();
    }
  }

}
