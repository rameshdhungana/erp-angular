import {Component, OnInit} from '@angular/core';
import {PageChangedEvent} from 'ngx-bootstrap';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {EventAttendeeService} from '../../../../../core/services/dashboard/event-attendee.service';
import {ActivatedRoute} from '@angular/router';
import {AttendeeEventRegistrationService} from '../../../../../core/services/attendee/attendee-event-registration.service';
import {EventItemService} from '../../../../../core/services/dashboard/event-item.service';


@Component({
  selector: 'app-list-event-atttendee',
  templateUrl: './list-event-attendee.component.html',
  styleUrls: ['./list-event-attendee.component.css']
})
export class ListEventAttendeeComponent implements OnInit {

  constructor(private http: HttpClient,
              private accommodationService: AttendeeEventRegistrationService,
              private eventAttendeeService: EventAttendeeService,
              private activatedRoute: ActivatedRoute,
              private eventItemService: EventItemService) {
  }

  allAttendeeList = new BehaviorSubject([]);
  accommodationItemList = [];
  pagination = new BehaviorSubject({});
  eventUuid: string;
  statusQueryParam = {'registration_status': 'all'};
  groupTypeQueryParam = {'group_type': 'all'};
  accommodationQueryParam = {'event_item_uuid': 'all'};
  finalQueryParam = {};
  filteredEventItemUuid: string;


  ngOnInit(): void {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');

    this.getAllEventAttendeeList();
    this.getAccommodationItemList();
  }

  getAccommodationItemList() {
    this.eventItemService.getEventItemList(this.eventUuid, {
      'group_type': 'OnSite',
      'group__name': 'Accommodation',
    }).subscribe(response => {
      this.accommodationItemList = response['data'];
    });
  }

  getAllEventAttendeeList() {
    this.eventAttendeeService.getAllEventAttendeeList(this.eventUuid, this.finalQueryParam).subscribe(response => {
      this.allAttendeeList.next(response['data']['results']);
      this.pagination.next(response['data']['pagination']);


    });
  }

  getAccommodationWiseAttendee(page = 1) {
    this.eventAttendeeService.getAccommodationWiseAttendee(this.eventUuid,
      {'event_item_uuid': this.filteredEventItemUuid, 'page': page}).subscribe(response => {
      this.allAttendeeList.next(response['data']['results']);
      this.pagination.next(response['data']['pagination']);
    });
  }

  filterAllStatusAttendee() {
    this.updateQueryParam('registration_status', 'all');

  }

  filterInitiatedAttendee() {
    // here we need to address group type since they are valid only for all or confirmed attendee
    this.deleteKeyFromFinalQueryParam('group_type');
    this.updateBasicQueryParam('group_type', 'all');

    this.updateQueryParam('registration_status', 'Initiated');


  }


  filterConfirmedAttendee() {
    this.updateQueryParam('registration_status', 'Confirmed');


  }

  filterCancelledAttendee() {
    // here we need to address group type since they are valid only for all or confirmed attendee
    this.deleteKeyFromFinalQueryParam('group_type');
    this.updateBasicQueryParam('group_type', 'all');

    this.updateQueryParam('registration_status', 'Cancelled');


  }

  filterAllGroupTypeAttendee() {
    this.updateQueryParam('group_type', 'all');

  }

  filterOnSiteAttendee() {
    this.updateQueryParam('group_type', 'OnSite');

  }


  filterOffSiteAttendee() {
    this.updateQueryParam('group_type', 'OffSite');


  }

  filterAllAccommodationAttendee() {
    this.updateQueryParam('event_item_uuid', 'all');

  }

  filterAccommodationWise(eventItemUuid) {
    this.filteredEventItemUuid = eventItemUuid;
    this.updateQueryParam('event_item_uuid', eventItemUuid);
    this.getAccommodationWiseAttendee();

  }

  searchAttendee(e) {
    const searchText = e.target.value;
    this.updateQueryParam('search', e.target.value);

  }

  deleteKeyFromFinalQueryParam(key) {
    delete this.finalQueryParam[key];

  }

  updateBasicQueryParam(key, value) {
    if (key === 'registration_status') {
      this.statusQueryParam[key] = value;
    }
    if (key === 'group_type') {
      this.groupTypeQueryParam[key] = value;

    }
    if (key === 'event_item_uuid') {
      this.accommodationQueryParam[key] = value;


    }
  }


  updateQueryParam(key, value) {

    this.updateBasicQueryParam(key, value);
    // if key is not 'search' then we update the finalQueryParam
    if (key !== 'search') {

      // we need to delete the 'search' key if in finalQueryParam first
      this.deleteKeyFromFinalQueryParam('search');

      // if value is not all we update the finalQueryParam , 'all' is used only on client side but not on server side
      if (value !== 'all') {
        this.finalQueryParam[key] = value;
      } else {
        this.deleteKeyFromFinalQueryParam(key);

      }

    } else {
      this.finalQueryParam = {};
      this.finalQueryParam[key] = value;
      //   here we need to reset all filter params to 'all' value
      this.resetQueryParam();

    }

    // we call the event attendee list for every key but not for 'event_item_uuid' (accommodation wise filter is exclusion)
    if (key !== 'event_item_uuid') {
      //  here  we need to delete event_item_uuid param from finalQueryParam
      // and reset it to 'all' value
      this.deleteKeyFromFinalQueryParam('event_item_uuid');
      this.updateBasicQueryParam('event_item_uuid', 'all');

      this.getAllEventAttendeeList();

    }


  }

  resetQueryParam() {
    this.updateBasicQueryParam('group_type', 'all');
    this.updateBasicQueryParam('registration_status', 'all');
    this.updateBasicQueryParam('event_item_uuid', 'all');
  }

  pageChanged(event: PageChangedEvent): void {
    this.finalQueryParam['page'] = event.page;
    // here we need to either get attendee accommodation wise using pagination if event_item_uuid is otherthan 'all'
    // else we need to get attendees this finalQueryParam
    if (this.accommodationQueryParam['event_item_uuid'] !== 'all') {
      this.getAccommodationWiseAttendee(event.page);
    } else {
      this.getAllEventAttendeeList();

    }
    // once page is updated , we need to delete it from finalQueryParam so that it does not affect in other filter and API calls
    this.deleteKeyFromFinalQueryParam('page');

  }
}
