import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { DisplayApiError } from '@firestitch/api';

import { Observable } from 'rxjs';

import { HttpContext } from '@angular/common/http';

import { PasswordData } from '../../data';
import { SigninService } from '../../../../services/signin.service';


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
    private _signService: SigninService,
  ) { }

  public requestCode = (email: string): Observable<any> => {
    return this._passwordData.request({ email });
  };

  public emailExists = (email: string): Observable<boolean> => {
    return this._signService.signinExists(email);
  };

  public verifyCode = (code: string): Observable<any> => {
    return this._passwordData.verify({ code }, {
      context: new HttpContext().set(DisplayApiError, false),
    });
  };

  public savePassword = (code: string, password: string): Observable<any> => {
    return this._passwordData.reset({
      code,
      password,
    });
  };

}
