import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token')) {
      // logged in so return true
      const token = localStorage.getItem('token');

      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigateByUrl('/auth/login');
    return false;
  }


}



