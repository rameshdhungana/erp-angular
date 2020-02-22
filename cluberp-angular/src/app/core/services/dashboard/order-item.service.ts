import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  constructor(private http: HttpClient) {
  }


  // get methods starts
  getArrivalAndDepartureReportList(eventUuid, queryParam) {
    return this.http.get(`orders/ordered-items/`, {params: queryParam});
  }

  downArrivalDepartureReportExcelFile(eventUuid, queryParam) {
    return this.http.get(`orders/ordered-items/`, {params: queryParam});

  }
}
