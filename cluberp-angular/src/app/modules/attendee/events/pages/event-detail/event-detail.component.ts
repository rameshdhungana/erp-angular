import {Component, OnInit} from '@angular/core';
import {EventService} from '../../../../../core/services/dashboard/event.service';
import {ActivatedRoute} from '@angular/router';
import {EventCommonService} from '../../../../../core/services/common/event-common.service';
import {EventItemService} from '../../../../../core/services/dashboard/event-item.service';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  eventDetail: any;
  eventUuid: string;
  otherEventList = [];
  registrationItemList = [];
  accommodationItemList = [];
  transportationItemList = [];

  // toggle variables
  registrationToggle = true;
  accommodationToggle = true;
  transportationToggle = true;

  constructor(
    private eventService: EventService,
    private eventCommonService: EventCommonService,
    private activatedRoute: ActivatedRoute,
    private eventItemService: EventItemService
  ) {
  }

  ngOnInit() {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.getEventDetail();
    this.getEventList();
    this.getTransportationItemList();
    this.getAccommodationItemList();
    this.getRegistrationItemList();


  }

  getTransportationItemList() {
    this.eventItemService.getEventItemList(this.eventUuid, {
      'event__uuid': this.eventUuid,
      'group__name': 'Transportation',
      'no_page': true
    }).subscribe(response => {
      this.transportationItemList = response['data'];

    });
  }

  getAccommodationItemList() {
    this.eventItemService.getEventItemList(this.eventUuid, {
      'event__uuid': this.eventUuid,
      'group__name': 'Accommodation',
      'no_page': true

    }).subscribe(response => {
      this.accommodationItemList = response['data'];

    });
  }

  getRegistrationItemList() {
    this.eventItemService.getEventItemList(this.eventUuid, {
        'event__uuid': this.eventUuid,
        'group__name': 'Registration',
        'no_page': true
      }
    ).subscribe(response => {
      this.registrationItemList = response['data'];

    });
  }

  getEventDetail() {
    this.eventCommonService.getEventDetail(this.eventUuid).subscribe(response => {
      this.eventDetail = response['data'];
    });
  }

  getEventList() {
    this.eventService.getEventList({'page': 1, 'is_published': true, 'status': 'Open'}).subscribe(response => {
      this.otherEventList = response['data']['results'];
      const index = this.otherEventList.findIndex(event =>
        event.uuid === this.eventUuid);
      // here we need to exclude the current event
      if (index !== -1) {
        this.otherEventList.splice(index, 1);

      }
    });
  }


//   accordion toggle function section starts

  toggleRegistration() {
    this.registrationToggle = !this.registrationToggle;
  }

  toggleAccommodation() {
    this.accommodationToggle = !this.accommodationToggle;
  }

  toggleTransportation() {
    this.transportationToggle = !this.transportationToggle;
  }

//   accordion toggle function section ends


}
