import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, config, Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  //
  // login(username: string, password: string) {
  //   return this.http.post<any>(`${config.apiUrl}/users/authenticate`, {username: username, password: password})
  //     .pipe(map(user => {
  //       // login successful if there's a jwt token in the response
  //       if (user && user.token) {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //       }
  //
  //       return user;
  //     }));
  // }

  // localStorageogout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem('currentUser');
  // }


  private loggedIn = new BehaviorSubject<boolean>(false);
  public getProfile = new Subject<Object>();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  login(loginData) {
    return this.http.post('auth/login/', loginData);
  }

  registerUser(registerdata) {
    return this.http.post('auth/register-user/', registerdata);
  }

  registerStaff(registerdata) {
    return this.http.post('auth/register-staff/', registerdata);
  }

  validateResetPassword(uid, token) {

    return this.http.get('validate-reset-password/' + uid + '/' + token + '/');
  }

  resetPassword(passworddata) {
    return this.http.post('reset-password/confirm/', passworddata);
  }

  forgetPassword(forgetdata) {
    return this.http.post('reset-password/', forgetdata);
  }

  changePassword(passworddata) {
    return this.http.post('change-password/', passworddata);
  }

  verify_email(key) {
    return this.http.post('register/verify-email/', {'key': key});
  }

  logout() {
    return this.http.post('auth/users/logout/', {});
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  isLoggedInObs() {
    if (localStorage.getItem('token')) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }

  me() {
    this.http.get('me/').subscribe(res => {
      this.getProfile.next(res);
    });
    return this.getProfile.asObservable();
  }
}







