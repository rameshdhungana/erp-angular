import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {OrderLoginConfirmationCodeService} from '../../shared/services/order-login-confirmation-code.service';

@Injectable({
  providedIn: 'root'
})
export class OrderLoginGuard implements CanActivate {
  constructor(private router: Router,
              private  orderLoginService: OrderLoginConfirmationCodeService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const eventUuid = next.paramMap.get('eventUuid');
    const attendeeUuid = next.paramMap.get('attendeeUuid');


    const confirmationCode = this.orderLoginService.getOrderLoginConfirmationCode();

    return new Promise((resolve, reject) => {
      if (confirmationCode) {
        const postData = {'confirmation_code': confirmationCode, 'attendee_uuid': attendeeUuid};
        this.orderLoginService.validateOrderLoginConfirmationCode(eventUuid, postData).subscribe(response => {
          if (response['code'] === 1) {
            localStorage.setItem('token', response['data']['key']);
            resolve(true);
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('order-login-confirmation-code');

            this.router.navigateByUrl(`/events/order/login/${eventUuid}`);
            resolve(false);
          }
        });
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('order-login-confirmation-code');
        this.router.navigateByUrl(`/events/order/login/${eventUuid}`);
        resolve(false);
      }
    });
  }
}
