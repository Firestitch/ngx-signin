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
import { switchMap } from 'rxjs/operators';

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

  public validateExists = (control: UntypedFormControl): Observable<any> => {
    if (control.value) {
      return this._signService.signinExists(control.value)
        .pipe(
          switchMap((exists) => {
            if(exists) {
              return of(true);
            }
            
            this.emailInput.focus();

            return throwError('Could not find your account');
          }),
        );
    }

    return of(true);
  };

  public submit = (): Observable<any> => {
    this.validated.emit({ email: this.email, password: this.password });
    this._cdRef.markForCheck();

    return of(true);
  };

  public emailChange(e): void {
    this.email = e.target.value;      
  }

  public passwordChange(e): void {
    this.password = e.target.value;      
  }

  public keydown(event: KeyboardEvent): void {
    if (event.code === 'Tab') {
      this.form.triggerSubmit();
    }
  }

}
