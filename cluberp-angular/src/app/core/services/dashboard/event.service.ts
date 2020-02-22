import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {
  }

  // in back-end url for events , the repeatative use of events/events is  : first indicates app_name, second indicated event viewset

  // get methods starts
  getEventList(queryParams) {
    return this.http.get('events/events/', {params: queryParams});
  }

  getEventOrganizerList(queryParams) {
    return this.http.get('events/organizers/', {params: queryParams});

  }

  getEventTypeList(queryParams) {
    return this.http.get('events/types/', {params: queryParams});

  }

  getEventCategoryList(queryParams) {
    return this.http.get('events/categories/', {params: queryParams});

  }


  getAvailableAccommodationSharingList(eventUuid) {
    return this.http.get(`events/${eventUuid}/event-items/get-available-accommodation-sharing-list`);
  }

  getAccommodationSharingCountList(eventUuid) {
    return this.http.get(`events/${eventUuid}/event-items/accommodation-item-sharing-count-list`);
  }

  getOffSiteDayPassRegistrationItems(eventUuid) {
    return this.http.get(`events/${eventUuid}/event-items/get-offsite-daypass-registration-items`);

  }

  getAllDaysRegistrationItems(eventUuid) {
    return this.http.get(`events/${eventUuid}/event-items/get-all-days-registration-items/`);

  }

  getGroupWiseEventItemList(eventUuid) {
    return this.http.get(`events/${eventUuid}/event-items/get-group-wise-event-items/`);

  }


//   get methods ends

//   post method starts
  createEvent(postData) {
    return this.http.post('events/events/', postData);
  }

  editEvent(postData, eventUuid) {
    return this.http.put(`events/events/${eventUuid}/`, postData);
  }

  deleteEvent(postData) {
    return this.http.post('events/events/', postData);
  }

//   post method ends


}
