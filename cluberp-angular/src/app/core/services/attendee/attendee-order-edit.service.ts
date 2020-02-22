import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendeeOrderEditService {
  orderEditDataResponse = new Subject();

  constructor(
    private http: HttpClient,
  ) {
  }

  // get methods starts
  getOrderEditData(eventUuid, attendeeUuid) {
    return this.http.get(`events/${eventUuid}/attendees/${attendeeUuid}/order-edit-data/`);
    //   .subscribe(response => {
    //   this.orderEditDataResponse = response['data'];
    // });
    // return this.orderEditDataResponse;


  }

  getEditedOrderAndCartSummary(eventUuid, mainAttendeeUuid) {
    return this.http.get(`events/${eventUuid}/attendees/${mainAttendeeUuid}/edited-order-and-cart-summary-data/`);

  }

  // get methods end

  // post methods start
  orderLogin(eventUuid, postData) {
    return this.http.post(`events/${eventUuid}/order-login/`, postData);

  }


  // this API is used to change attendee in order edit, > i.e changes registration_status of changedAttendee
  // and create new attendee and associate to main_attendee

  changeAttendee(eventUuid, mainAttendeeUuid, postData) {
    return this.http.post(`events/${eventUuid}/attendees/${mainAttendeeUuid}/change-attendee/`, postData);

  }

  changeAccommodation(eventUuid, mainAttendeeUuid, postData) {
    return this.http.post(`events/${eventUuid}/attendees/${mainAttendeeUuid}/change-accommodation-items/`, postData);

  }

  changeTransportationItems(eventUuid, mainAttendeeUuid, postData) {
    return this.http.post(`events/${eventUuid}/attendees/${mainAttendeeUuid}/change-transportation-items/`, postData);

  }

  changeOnSiteToOffsiteRegistration(eventUuid, mainAttendeeUuid) {
    return this.http.post(`events/${eventUuid}/attendees/${mainAttendeeUuid}/change-onsite-to-offsite-registration/`, []);


  }

  changeOffSiteToOnSiteRegistration(eventUuid, mainAttendeeUuid) {
    return this.http.post(`events/${eventUuid}/attendees/${mainAttendeeUuid}/change-offsite-to-onsite-registration/`, []);


  }

  cancelRegistration(eventUuid, mainAttendeeUuid) {
    return this.http.post(`events/${eventUuid}/attendees/${mainAttendeeUuid}/cancel-registration/`, []);

  }

//    post method ends


}
