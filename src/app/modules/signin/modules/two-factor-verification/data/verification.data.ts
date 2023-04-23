import { Injectable } from '@angular/core';

import { IFsVerificationMethod } from '@firestitch/2fa';
import { FsApi } from '@firestitch/api';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class VerificationData<T = any> {

  constructor(private _api: FsApi) { }

  public resend(): Observable<T> {
    return this._api.post('verification/resend');
  }

  public selectVerificationMethod(verificationMethod: IFsVerificationMethod): Observable<T> {
    return this._api.post(`verification/methods/${verificationMethod.id}`, {}, { key: 'verificationMethod' });
  }

  public getVerificationMethods(): Observable<T> {
    return this._api.get('verification/methods', {}, { key: 'verificationMethods' });
  }

}
