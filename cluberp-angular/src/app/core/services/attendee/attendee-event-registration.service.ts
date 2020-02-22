import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendeeEventRegistrationService {
  eventCartItemList = new Subject();

  constructor(
    private http: HttpClient
  ) {
  }

  // get methods  starts
  getRegisteredAttendeesDetail(eventUuid, attendeeUuid) {
    return this.http.get(`events/${eventUuid}/attendees/${attendeeUuid}/get-all-attendee-detail`);

  }

  getEventCartItemList(eventUuid, attendeeUuid) {
    this.http.get(`events/${eventUuid}/attendees/${attendeeUuid}/event-cart-summary`).subscribe(response => {
        this.eventCartItemList.next(response);

      }
    );
    return this.eventCartItemList;
  }

  getEventAttendeeOrderSummary(eventUuid, attendeeUuid) {
    return this.http.get(`events/${eventUuid}/attendees/${attendeeUuid}/order-summary/`);

  }

  getAlreadyAddedTransportationCartItems(eventUuid, attendeeUuid) {
    return this.http.get(`events/${eventUuid}/attendees/${attendeeUuid}/get-already-added-transportation-cart-items/`);

  }

  getAlreadyAddedAccommodationCartItems(eventUuid, attendeeUuid) {
    return this.http.get(`events/${eventUuid}/attendees/${attendeeUuid}/get-already-added-accommodation-cart-items/`);

  }

  getAlreadyRegisteredGuestAttendees(eventUuid, attendeeUuid) {
    return this.http.get(`events/${eventUuid}/attendees/${attendeeUuid}/get-already-registered-guest-attendees/`);

  }

  // get methods ends


  // post methods start
  createMainAttendee(eventUuid, postData) {
    return this.http.post(`events/${eventUuid}/attendees/`, postData);
  }

  registerGuestAttendees(eventUuid, attendeeUuid, postData) {
    return this.http.post(`events/${eventUuid}/attendees/${attendeeUuid}/register-guest-attendees/`, postData);

  }

  // this API adds accommodation items into cart
  registerAccommodationItems(eventUuid, attendeeUuid, postData) {
    return this.http.post(`events/${eventUuid}/attendees/${attendeeUuid}/register-accommodation-items/`, postData);

  }

  // this API adds transportation items into cart
  registerTransportationItems(eventUuid, attendeeUuid, postData) {
    return this.http.post(`events/${eventUuid}/attendees/${attendeeUuid}/register-transportation-items/`, postData);

  }

  validateAndApplyCouponCode(postData) {
    return this.http.post(`coupons/coupons/validate-coupon/`, postData);

  }

  removeCouponFromCart(postData) {
    return this.http.post(`coupons/coupons/remove-coupon-from-cart/`, postData);

  }


  //  post methods end


}
