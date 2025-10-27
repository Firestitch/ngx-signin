import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { DisplayApiError } from '@firestitch/api';
import { FsPasswordResetModule } from '@firestitch/password-reset';

import { Observable } from 'rxjs';

import { HttpContext } from '@angular/common/http';

import { SigninService } from '../../../../services/signin.service';
import { PasswordData } from '../../data';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FsPasswordResetModule],
  providers: [PasswordData],
})
export class PasswordResetComponent {
  private _passwordData = inject(PasswordData);
  private _signService = inject(SigninService);


  @Input() public email;

  @Output() public titleChange = new EventEmitter<string>();
  @Output() public subtitleChange = new EventEmitter<string>();
  @Output() public cancelled = new EventEmitter();
  @Output() public completed = new EventEmitter<{
    email: string;
    password: string;
    code: string;
  }>();

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
