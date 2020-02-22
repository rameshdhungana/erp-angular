import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(
    private http: HttpClient
  ) {
  }

  confirmOrder(eventUuid, attendeeUuid, tokenData) {
    return this.http.post(`events/${eventUuid}/attendees/${attendeeUuid}/confirm-order/`, tokenData);

  }


  // order edit section starts

  confirmOrderEdit(eventUuid, attendeeUuid, tokenData) {
    return this.http.post(`events/${eventUuid}/attendees/${attendeeUuid}/confirm-order-edit/`, tokenData);

  }

  redeemBalance(postData) {
    return this.http.post(`payments/redeem-balance/`, postData);

  }

  payBalance(postData) {
    return this.http.post(`payments/pay-balance/`, postData);

  }

  topUpBalance(postData) {
    return this.http.post(`payments/topup-balance/`, postData);

  }

//   order edit section ends

//   secure pay test api
  securePayTest(postData) {
    return this.http.post(`https://test.api.securepay.com.au/directpost/authorise`, postData);
    // return this.http.get(`https://www.securepay.com.au/solutions/securepay-online-payments/`);

  }


}
