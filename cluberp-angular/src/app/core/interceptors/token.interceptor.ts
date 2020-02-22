import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with token if available
    const token = localStorage.getItem('token');
    if (localStorage.getItem('HTTP_INTERCEPTION_IS_DISABLED')) {
      request = request.clone({url: request.url});
      localStorage.removeItem('HTTP_INTERCEPTION_IS_DISABLED');

    } else {
      request = request.clone({url: environment.serverUrl + request.url});

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Token ${token}`
          }
        });
      }

    }


    return next.handle(request);
  }
}



