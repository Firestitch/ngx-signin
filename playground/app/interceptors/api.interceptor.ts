
import { makeInterceptorFactory, RequestInterceptor } from '@firestitch/api';

import { Observable } from 'rxjs';

import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';


export class ApiInterceptor extends RequestInterceptor {

  constructor(
    public config,
    public data,
  ) {
    super(config, data);
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = `https://specify.firestitch.dev/api/`.concat(req.url);

    return next.handle(req.clone({ url }));
  }
}

export const ApiInterceptorFactory = makeInterceptorFactory(ApiInterceptor);
