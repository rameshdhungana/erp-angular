import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransportationPickupLocationService {

  constructor(private http: HttpClient) {
  }

//   get method starts
  getAllPickUpLocationList(eventUuid, queryParam) {
    return this.http.get(`events/${eventUuid}/transportation-pickup-locations/`, {params: queryParam});
  }

//   post methods starts

  createPickUpLocation(eventUuid, postData) {
    return this.http.post(`events/${eventUuid}/transportation-pickup-locations/`, postData);

  }

  editPickUpLocation(eventUuid, pickUpLocationUuid, postData) {
    return this.http.put(`events/${eventUuid}/transportation-pickup-locations/${pickUpLocationUuid}/`, postData);

  }


  deletePickUpLocation(eventUuid, pickUpLocationUuid) {
    return this.http.delete(`events/${eventUuid}/transportation-pickup-locations/${pickUpLocationUuid}/`);

  }
}
