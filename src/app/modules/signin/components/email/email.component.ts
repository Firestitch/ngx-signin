import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input, Output,
  ViewChild,
} from '@angular/core';

import { MatInput } from '@angular/material/input';

import { IFsVerificationMethod } from '@firestitch/2fa';
import { FsFormDirective } from '@firestitch/form';

import { Observable, of, tap } from 'rxjs';


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
  @Input() public continueLabel = 'Continue';

  @Output() public signedIn = new EventEmitter<any>();
  @Output() public verificationRequired = new EventEmitter<IFsVerificationMethod>();
  @Output() public passwordReset = new EventEmitter<string>();
  @Output() public validated = new EventEmitter<{ email: string; password: string }>();
  @Output() public cleared = new EventEmitter<any>();

  public password: string;
  public initTimestamp = Date.now();
  
  public validateEmail = (): Observable<any> => {
    return of(true)
      .pipe(
        tap(() => {
          // Delay 2 seconds to prevent password autofill from browser on page load
          console.log('initTimestamp', this.initTimestamp);
          console.log('Date.now()', Date.now());
          console.log('Date.now() - this.initTimestamp', Date.now() - this.initTimestamp);
          if((Date.now() - this.initTimestamp) > (5 * 1000)) {
            this.validated.emit({ email: this.email, password: this.password });
          }
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
    console.log('Password change'); 
    console.log('Password change Date.now()', Date.now());
    this.password = e.target.value;
    this.form.triggerSubmit();
  }

  public keydown(event: KeyboardEvent): void {
    this.password = '';
    if (event.code === 'Tab') {
      console.log('Tab key pressed');
      console.log('Tab Date.now()', Date.now());
      this.form.triggerSubmit();
    }
  }

}
