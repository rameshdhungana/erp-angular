import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventItemService {

  constructor(private http: HttpClient) {
  }


  // get methods starts
  getEventItemGroupTypeList(eventUuid, queryParam) {
    return this.http.get(`events/${eventUuid}/item-groups/`, {params: queryParam});
  }

  getEventItemList(eventUuid, queryParams) {
    return this.http.get(`events/${eventUuid}/event-items/`, {params: queryParams});
  }

  getEventItemDetail(eventUuid, eventItemUuid) {
    return this.http.get(`events/${eventUuid}/event-items/${eventItemUuid}`);

  }

  getAttendeeListForRoomAllocation(eventUuid, eventItemUuid) {
    return this.http.get(`events/${eventUuid}/event-items/${eventItemUuid}/get-attendee-list-for-room-allocation/`);


  }

  downLoadEmptyExcelSheetForRoomAllocation(eventUuid, eventItemUuid) {
    return this.http.get(`events/${eventUuid}/event-items/${eventItemUuid}/download-empty-excel-sheet-for-room-allocation/`);


  }

  getTransportationItemMasterNameList(eventUuid) {
    return this.http.get(`events/${eventUuid}/get-transportation-item-master-name-list/`);


  }


//   post methods starts
  createRoom(eventUuid, postData) {
    return this.http.post(`events/${eventUuid}/accommodation-rooms/`, postData);

  }

  editAccommodationRoom(eventUuid, roomUuid, postData) {
    return this.http.patch(`events/${eventUuid}/accommodation-rooms/${roomUuid}/`, postData);


  }

  deleteAccommodationRoom(eventUuid, roomUuid) {
    return this.http.delete(`events/${eventUuid}/accommodation-rooms/${roomUuid}/`);

  }

  uploadRoomAllocationExcelSheet(eventUuid, eventItemUuid, postData) {
    return this.http.post(`events/${eventUuid}/event-items/${eventItemUuid}/upload-room-allocation-excel-sheet/`, postData);

  }

  uploadRoomCreationExcelSheet(eventUuid, eventItemUuid, postData) {
    return this.http.post(`events/${eventUuid}/event-items/${eventItemUuid}/upload-room-creation-excel-sheet/`, postData);

  }


}
