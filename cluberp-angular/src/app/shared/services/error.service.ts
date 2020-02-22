import {Injectable} from '@angular/core';
import {AlertService} from './alert.service';
import {AuthenticationService} from '../../core/services';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router
  ) {
  }

  getError(err) {

    if (err.error instanceof ErrorEvent) {
      // client-side error
      this.alertService.error(err.error.message);

    } else {
      // server-side error


      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        // location.reload(true);
        this.router.navigateByUrl('auth/login');
      } else if (err.status === 0) {
        this.alertService.error('Unable to process your request currently!');
      } else if (err.status === 400) {
        if (err.error.non_field_errors) {
          const error_message = err.error.non_field_errors[0];
          this.alertService.error(error_message);
        } else {
          for (const key of err.error) {
            for (const message of err.error.errors[key]) {
              const msg = key.replace('_', ' ').toLocaleUpperCase() + ': ' + message;
              this.alertService.error(msg);
            }
          }
        }
      } else {
        this.alertService.error(null);
      }

      //   if error code is 401 or 406 we need to remove the token from the localstorage
      if (err.status === 401 || err.status === 406) {
        localStorage.removeItem('token');
      }
    }
  }
}
