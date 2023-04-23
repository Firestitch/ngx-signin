import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Observable } from 'rxjs';

import { PasswordData } from '../../data';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetComponent {

  @Input() public email;

  @Output() public titleChange = new EventEmitter<string>();
  @Output() public cancelled = new EventEmitter();
  @Output() public completed = new EventEmitter<{
    email: string;
    password: string;
    code: string;
  }>();

  constructor(
    private _passwordData: PasswordData,
  ) { }

  public requestCode = (email: string): Observable<any> => {
    return this._passwordData.request({ email });
  };

  public verifyCode = (code: string): Observable<any> => {
    return this._passwordData.verify({ code }, {
      data:  { handleError: false },
    });
  };

  public savePassword = (code: string, password: string): Observable<any> => {
    return this._passwordData.reset({
      code,
      password,
    });
  };

}
