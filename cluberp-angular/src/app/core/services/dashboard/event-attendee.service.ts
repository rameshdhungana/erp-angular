import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventAttendeeService {
  constructor(private http: HttpClient) {
  }

  // in back-end url for events , the repeative use of events/events is  : first indicates app_name, second indicated event viewset

  // get methods starts
  getAllEventAttendeeList(eventUuid, queryParam) {
    return this.http.get(`events/${eventUuid}/attendees/`, {params: queryParam});
  }

  getAccommodationWiseAttendee(eventUuid, queryParam) {
    return this.http.get(`events/${eventUuid}/accommodation-wise-attendee-list/`, {params: queryParam});
  }

  getAllCreditorAttendeeList(eventUuid, queryParam) {
    return this.http.get(`events/${eventUuid}/creditor-list/`, {params: queryParam});
  }

  getAllDebitorAttendeeList(eventUuid, queryParam) {
    return this.http.get(`events/${eventUuid}/debitor-list/`, {params: queryParam});
  }

  getAllReceiptList(eventUuid, queryParam) {
    return this.http.get(`events/${eventUuid}/receipt-list/`, {params: queryParam});
  }

  getAllRefundList(eventUuid, queryParam) {
    return this.http.get(`events/${eventUuid}/refund-list/`, {params: queryParam});
  }


}
