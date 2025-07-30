import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input, Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

import { IFsVerificationMethod } from '@firestitch/2fa';
import { FsCommonModule } from '@firestitch/common';
import { FsFormDirective, FsFormModule } from '@firestitch/form';

import { Observable, of, tap } from 'rxjs';


import { StackedButtonsComponent } from '../../modules/stacked-buttons/components/stacked-buttons/stacked-buttons.component';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    FsFormModule,
    MatFormField,
    MatLabel,
    MatIcon,
    MatInput,
    FsCommonModule,
    StackedButtonsComponent,
    MatButton,
  ],
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
          this.validated.emit({ email: this.email, password: this.password });
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
    this.form.triggerSubmit();
  }

  public keydown(event: KeyboardEvent): void {
    this.password = '';
    if (event.code === 'Tab') {
      this.form.triggerSubmit();
    }
  }

}
