import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectToDashboardGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      // logged in so return true
      const token = localStorage.getItem('token');
      this.router.navigateByUrl('dashboard');

      return false;
    }

    // not logged in so redirect to login page with the return url
    return true;
  }
}
