import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {PageChangedEvent} from 'ngx-bootstrap';
import {OrderItemService} from '../../../../../core/services/dashboard/order-item.service';
import {TransportationPickupLocationService} from '../../../../../core/services/dashboard/transportation-pickup-location.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EventItemService} from '../../../../../core/services/dashboard/event-item.service';
import {AlertService} from '../../../../../shared/services/alert.service';
import {ExcelService} from '../../../../../core/services/common/excel.service';

@Component({
  selector: 'app-list-arrival-departure-report',
  templateUrl: './list-arrival-departure-report.component.html',
  styleUrls: ['./list-arrival-departure-report.component.css']
})
export class ListArrivalDepartureReportComponent implements OnInit {

  constructor(private http: HttpClient,
              private orderItemService: OrderItemService,
              private eventItemService: EventItemService,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService,
              private excelService: ExcelService,
              private transportationPickupLocationService: TransportationPickupLocationService,
              private formBuilder: FormBuilder) {
  }

  allArrivalAndDepartureReportList = new BehaviorSubject([]);
  transportationPickUpLocationList = [];
  itemMasterNameList = [];

  pagination = new BehaviorSubject({});
  eventUuid: string;
  finalQueryParam = {};
  pickUpLocationQueryParam = {'transportation_info__pickup_location__location': 'all'};
  eventItemQueryParam = {'item_master__name': 'all'};
  arrivalDateTimeQueryParam = {'transportation_info__arrival_datetime__date': 'all'};
  departureDateTimeQueryParam = {'transportation_info__departure_datetime__date': 'all'};


  arrivalAndDepartureDateTimeForm: FormGroup;

  ngOnInit(): void {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');

    this.getArrivalAndDepartureReportList();
    this.getAllPickUpLocationList();
    this.buildArrivalAndDepartureDateTimeForm();
    this.getTransportationItemMasterNameList();
  }


  getArrivalAndDepartureReportList() {
    // here basic queryparam would be for transportation type items with event__uuid for this this event item
    this.updateFinalQueryParam('event_item__group__name', 'Transportation');
    this.updateFinalQueryParam('event__uuid', this.eventUuid);
    this.orderItemService.getArrivalAndDepartureReportList(this.eventUuid, this.finalQueryParam).subscribe(response => {
      this.allArrivalAndDepartureReportList.next(response['data']['results']);
      this.pagination.next(response['data']['pagination']);


    });
  }

  getTransportationItemMasterNameList() {
    this.eventItemService.getTransportationItemMasterNameList(this.eventUuid).subscribe(response => {
      this.itemMasterNameList = response['data'];
    });
  }

  getAllPickUpLocationList() {
    this.transportationPickupLocationService.getAllPickUpLocationList(this.eventUuid, {'no_page': true}).subscribe(response => {
      this.transportationPickUpLocationList = response['data'];
    });


  }

  buildArrivalAndDepartureDateTimeForm() {
    this.arrivalAndDepartureDateTimeForm = this.formBuilder.group({
      'arrival_datetime': [''],
      'departure_datetime': ['']
    });
  }

  searchArrivalAndDepartureDateWise() {
    const arrivalDateTime = this.arrivalAndDepartureDateTimeForm.get('arrival_datetime').value;
    const departureDateTime = this.arrivalAndDepartureDateTimeForm.get('departure_datetime').value;
    if (arrivalDateTime) {
      this.arrivalDateTimeQueryParam['transportation_info__arrival_datetime__date'] = arrivalDateTime;
      this.updateFinalQueryParam('transportation_info__arrival_datetime__date', arrivalDateTime);
    }
    if (departureDateTime) {

      this.departureDateTimeQueryParam['transportation_info__departure_datetime__date'] = departureDateTime;
      this.updateFinalQueryParam('transportation_info__departure_datetime__date', departureDateTime);

    }
    this.getArrivalAndDepartureReportList();


  }


  filterAllPickUpLocation() {
    this.updateBaseQueryParam('transportation_info__pickup_location__location', 'all');
    this.deleteKeyFromFinalQueryParam('transportation_info__pickup_location__location');
    this.getArrivalAndDepartureReportList();
  }

  filterOnPickUpLocation(location) {
    this.pickUpLocationQueryParam['transportation_info__pickup_location__location'] = location;
    this.updateFinalQueryParam('transportation_info__pickup_location__location', location);
    this.getArrivalAndDepartureReportList();

  }

  filterAllEventItem() {
    this.updateBaseQueryParam('item_master__name', 'all');
    this.deleteKeyFromFinalQueryParam('item_master__name');
    this.getArrivalAndDepartureReportList();
  }

  filterOnEventItem(eventItemName) {
    this.eventItemQueryParam['item_master__name'] = eventItemName;
    this.updateFinalQueryParam('item_master__name', eventItemName);
    this.getArrivalAndDepartureReportList();

  }

  resetAllFilter() {
    this.finalQueryParam = {};
    this.pickUpLocationQueryParam = {'transportation_info__pickup_location__location': 'all'};
    this.eventItemQueryParam = {'item_master__name': 'all'};
    this.arrivalDateTimeQueryParam = {'transportation_info__arrival_datetime__date': 'all'};
    this.departureDateTimeQueryParam = {'transportation_info__departure_datetime__date': 'all'};
    this.arrivalAndDepartureDateTimeForm.reset();
    this.getArrivalAndDepartureReportList();
  }

  search(e) {
    this.initializeAndUpdateQueryParam('search', e.target.value);
    this.getArrivalAndDepartureReportList();

  }

  disableSearchButtonStatus() {
    if (this.arrivalAndDepartureDateTimeForm.get('arrival_datetime').value ||
      this.arrivalAndDepartureDateTimeForm.get('departure_datetime').value) {
      return false;
    }
    return true;
  }

  deleteKeyFromFinalQueryParam(key) {
    delete this.finalQueryParam[key];

  }

  updateBaseQueryParam(key, value) {
    if (key === 'transportation_info__pickup_location__location') {
      this.pickUpLocationQueryParam[key] = value;

    }
    if (key === 'item_master__name') {
      this.eventItemQueryParam[key] = value;

    }
  }

  updateFinalQueryParam(key, value) {
    this.finalQueryParam[key] = value;

  }

  initializeAndUpdateQueryParam(key, value) {
    this.finalQueryParam = {};
    this.updateFinalQueryParam(key, value);
  }

  pageChanged(event: PageChangedEvent): void {
    this.updateFinalQueryParam('page', event.page);
    this.getArrivalAndDepartureReportList();

  }

//   excel file report download related functions
  downArrivalDepartureReportExcelFile() {
    // we need to remove page param if in finalQueryParam and add no_page to it
    this.deleteKeyFromFinalQueryParam('page');
    this.updateFinalQueryParam('no_page', true);

    this.orderItemService.getArrivalAndDepartureReportList(this.eventUuid, this.finalQueryParam).subscribe(response => {
        const excelFormattedData = [];
        response['data'].forEach(function (data, index) {
          excelFormattedData.push({
            'Full Name': data.event_attendee.user.first_name + data.event_attendee.user.last_name,
            'Email': data.event_attendee.user.email,
            'Phone Number': data.event_attendee.user.phone_number,
            'Transportation Item': data.event_item.item_master.name,
            'Arrival DateTime': new Date(data.transportation_info.arrival_datetime),
            'Departure DateTime': new Date(data.transportation_info.departure_datetime),
            'PickUp Location': data.transportation_info.pickup_location.location
          });
        });
        this.exportAsXLSX(excelFormattedData, 'arrival_departure_report');
      },
      error1 => {
        this.alertService.error('Something went wrong.');
      });
  }


  exportAsXLSX(data, fileName): void {
    this.excelService.exportAsExcelFile(data, fileName);

  }


}
