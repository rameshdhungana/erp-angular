import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderLoginConfirmationCodeService {

  orderLoginConfirmationCode = new BehaviorSubject('');

  constructor(
    private http: HttpClient
  ) {

  }

  setOrderLoginConfirmationCode(confirmationCode) {
    this.orderLoginConfirmationCode.next(confirmationCode);
    localStorage.setItem('order-login-confirmation-code', this.orderLoginConfirmationCode.value);

  }

  removeOrderLoginConfirmationCode() {
    const confirmationCode = localStorage.getItem('order-login-confirmation-code');
    if (confirmationCode) {
      localStorage.removeItem('order-login-confirmation-code');
      this.orderLoginConfirmationCode.next('');
    }


  }

  getOrderLoginConfirmationCode() {
    const confirmationCode = localStorage.getItem('order-login-confirmation-code');
    if (confirmationCode) {
      this.orderLoginConfirmationCode.next(confirmationCode);
    }
    return this.orderLoginConfirmationCode.value;

  }

  // post method starts
  validateOrderLoginConfirmationCode(eventUuid, postData) {
    return this.http.post(`events/${eventUuid}/validate-order-login-confirmation-code/`, postData);

  }

//   post methods ends
}
