import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AlertService} from '../../shared/services/alert.service';
import {AuthenticationService} from '../services';
import {Router} from '@angular/router';
import {ErrorService} from '../../shared/services/error.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router,
              private errorService: ErrorService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      this.errorService.getError(err);

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}






