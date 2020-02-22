import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const routes = {
  users: '/users'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserList() {
    return this.http.get('auth/users/');
  }

}
