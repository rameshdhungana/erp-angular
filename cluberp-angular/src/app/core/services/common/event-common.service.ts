import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventCommonService {

  constructor(private http: HttpClient) {
  }

  // get methods starts
  getEventTimeZone(eventUuid) {
    return this.http.get(`events/${eventUuid}/get-event-timezone/`);
  }


  getEventDetail(eventUuid) {
    return this.http.get(`events/events/${eventUuid}`);
  }


  getEventStartDateEndDateTimezone(eventUuid) {
    return this.http.get(`events/${eventUuid}/get-event-start-date-end-date-timezone/`);

  }

//   get methods ends

}
