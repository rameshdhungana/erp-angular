import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupPermissionService {

  constructor(private http: HttpClient) {
  }

  getPermissionList() {
    return this.http.get('auth/permissions/');
  }

  createGroupWithPermissions(postData) {
    return this.http.post('auth/groups/', postData);
  }

  getGroupList() {
    return this.http.get('auth/groups/');
  }
}
