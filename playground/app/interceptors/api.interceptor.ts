
import { makeInterceptorFactory } from '@firestitch/api';

import { Observable } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';


export class ApiInterceptor implements HttpInterceptor {

  constructor(
    public config,
    public data,
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //const url = 'https://specify.firestitch.dev/api/'.concat(req.url);

    return next.handle(req.clone());
  }
}

export const ApiInterceptorFactory = makeInterceptorFactory(ApiInterceptor);
