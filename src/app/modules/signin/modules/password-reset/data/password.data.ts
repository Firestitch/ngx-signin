import { Injectable } from '@angular/core';

import { FsApi } from '@firestitch/api';

import { Observable } from 'rxjs';


@Injectable()
export class PasswordData {

  constructor(
    private _api: FsApi,
  ) {
  }

  public reset(data, options?): Observable<any> {
    return this._api.post('password/reset', data, options);
  }

  public request(data, options?): Observable<any> {
    return this._api.post('password/request', data, options);
  }

  public verify(data, options?): Observable<any> {
    return this._api.post('password/verify', data, options);
  }

}
